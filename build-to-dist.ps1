# build-to-dist.ps1
# Nuxt build and deploy skript (portfolio-like flow)
# - kontrola .env a potrebnych premennych
# - kontrola git stavu: staged OK, untracked/unstaged = STOP (vypis git status)
# - auto-commit staged zdrojov s ISO timestampom (ak nieco staged je)
# - build -> .output
# - .output sa ulozi do TEMP, prepnutie na dist, kopia .output z TEMP, git add/commit/push
# - navrat na source branch

param(
  [string]$SourceBranch = "master",
  [string]$DistBranch   = "dist",
  [switch]$UseNpm,
  [switch]$SkipEnvCheck
)

$ErrorActionPreference = "Stop"

function Run($cmd) {
  Write-Host ">> $cmd"
  iex $cmd
  if ($LASTEXITCODE -ne 0) { throw "Command failed: $cmd" }
}

Write-Host "[INFO] === Nuxt build-to-dist start ==="

# 1) over git repo a aktualnu vetvu
Run "git rev-parse --is-inside-work-tree"
$currentBranch = (git branch --show-current).Trim()
if (-not $currentBranch) { throw "[ERR] Not on any branch" }

# 2) .env kontrola (ak nie je skip)
if (-not $SkipEnvCheck) {
  $envPath = ".env"
  if (!(Test-Path $envPath)) {
    Write-Host "[ERR] .env file missing. Aborting."
    exit 1
  }
  $envContent = Get-Content $envPath | Where-Object { $_ -match "=" }
  $requiredKeys = @("MAIL_USER", "MAIL_PASS", "MAIL_TO")
  foreach ($key in $requiredKeys) {
    if (-not ($envContent -match "^$key\s*=")) {
      Write-Host "[ERR] Missing required key in .env: $key"
      exit 1
    }
  }
  Write-Host "[OK] .env variables verified."
}

# 3) git stav: povolime STAGED, zakazeme UNTRACKED/UNSTAGED (rovnako ako nuxt-portfolio)
$porcelain = git status --porcelain
$lines = ($porcelain -split "`n") | Where-Object { $_ -ne "" }

$hasDirty = $false
foreach ($l in $lines) {
  # Porcelain format: XY <path>
  # '??' = untracked, ' M' alebo ' D' = unstaged (druhy znak != space)
  if ($l.Length -ge 2) {
    $x = $l.Substring(0,1)  # index (staged)
    $y = $l.Substring(1,1)  # working tree (unstaged)
    if ($l.StartsWith("??") -or $y -ne " ") { $hasDirty = $true; break }
  }
}

if ($hasDirty) {
  Write-Host "[WARN] Unstaged or untracked changes detected. Please stage them first."
  git status
  exit 1
}

# 4) auto-commit staged zdrojov (ak je co commitnut)
# zistime, ci nieco je staged
$staged = (git diff --cached --name-only)
if ($staged) {
  $ts = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
  Write-Host "[INFO] Auto committing staged source snapshot ($ts)..."
  Run "git add -A"
  Run "git commit -m `"Source snapshot $ts`""
  Run "git push origin $SourceBranch"
} else {
  Write-Host "[INFO] Nothing staged to commit on $SourceBranch. Continuing..."
}

# 5) build
Write-Host "[INFO] Starting Nuxt build..."
if (-not $UseNpm -and (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  try { Run "pnpm approve-builds" } catch { Write-Host "(pnpm approve-builds not required)" }
  Run "pnpm install --frozen-lockfile"
  Run "pnpm build"
} else {
  Run "npm ci"
  Run "npm run build"
}

if (!(Test-Path ".output")) {
  Write-Host "[ERR] Build did not produce .output/. Aborting."
  exit 1
}

# 6) zalohuj .output do TEMP (pretoze checkout dist prepise pracovny strom)
$tmpOut = Join-Path $env:TEMP "nuxt-output-copy"
if (Test-Path $tmpOut) { Remove-Item $tmpOut -Recurse -Force }
New-Item -ItemType Directory -Path $tmpOut | Out-Null

# kopirujeme cely obsah .output/
$srcOut = Resolve-Path ".\.output"
$rc = robocopy $srcOut $tmpOut /MIR /NFL /NDL /NJH /NJS /NP
if ($LASTEXITCODE -ge 8) { Write-Host "[ERR] Robocopy failed (exit $LASTEXITCODE)."; exit 1 }
Write-Host "[OK] .output copied to TEMP: $tmpOut"

# 7) prepni na dist vetvu
Write-Host "[INFO] Switching to $DistBranch..."
$branches = (git branch --list $DistBranch)
if (-not $branches) { Run "git branch $DistBranch $SourceBranch" }
Run "git checkout $DistBranch"

# 8) vycisti existujuci .output a skopiruj z TEMP
if (Test-Path ".\.output") { Remove-Item ".\.output" -Recurse -Force }
New-Item -ItemType Directory -Path ".\.output" | Out-Null
$rc2 = robocopy $tmpOut ".\.output" /MIR /NFL /NDL /NJH /NJS /NP
if ($LASTEXITCODE -ge 8) { Write-Host "[ERR] Robocopy to dist failed (exit $LASTEXITCODE)."; exit 1 }

# 9) commit a push .output do dist
Write-Host "[INFO] Committing and pushing .output to $DistBranch..."
Run "git add -f .output"
$ts2 = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
Run "git commit -m `"Deploy .output from $SourceBranch $ts2`""
Run "git push origin $DistBranch"

# 10) navrat na source branch
Write-Host "[INFO] Switching back to $SourceBranch..."
Run "git checkout $SourceBranch"

# 11) cleanup TEMP
if (Test-Path $tmpOut) { Remove-Item $tmpOut -Recurse -Force }

Write-Host "[OK] === Build-to-dist completed successfully ==="
