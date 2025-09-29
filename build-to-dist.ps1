# build-to-dist.ps1
# Nuxt build a deploy skript (podla nuxt-portfolio logiky)
# - Krok 1: kontrola gitu: staged OK, untracked/unstaged = STOP (vypis git status)
# - Auto-commit staged zdrojov s ISO timestampom a push na remote
# - Build -> .output
# - .output sa skopiruje do TEMP, na source branche sa vycisti, prepneme na dist,
#   v dist sa vycisti vsetko okrem .git, skopiruje sa .output, git add/commit/push
# - Navrat na source branch
# Pozn: odporucam mat v .gitignore riadok ".output/"

param(
  [string]$SourceBranch = "master",  # zmen na "main" ak pouzivas main
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

# 0) over git repo a aktualnu vetvu
Run "git rev-parse --is-inside-work-tree"
$currentBranch = (git branch --show-current).Trim()
if (-not $currentBranch) { throw "[ERR] Not on any branch" }
if ($currentBranch -ne $SourceBranch) {
  Write-Host "[INFO] Switching to $SourceBranch..."
  Run "git checkout $SourceBranch"
}

# 1) .env kontrola (ak nie je skip)
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

# 2) git stav: POVOL staged, ZAKAZ untracked/unstaged
$porcelain = git status --porcelain
$lines = ($porcelain -split "`n") | Where-Object { $_ -ne "" }

$hasDirty = $false
foreach ($l in $lines) {
  if ($l.Length -ge 2) {
    $x = $l.Substring(0,1)  # staged index
    $y = $l.Substring(1,1)  # working tree (unstaged)
    if ($l.StartsWith("??") -or $y -ne " ") { $hasDirty = $true; break }
  }
}

if ($hasDirty) {
  Write-Host "[WARN] Unstaged alebo untracked zmeny detekovane. Najprv pouzi git add."
  git status
  exit 1
}

# 3) AUTO-COMMIT STAGED ZMIEN (ak je co) + PUSH
$staged = (git diff --cached --name-only)
if ($staged) {
  $ts = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
  Write-Host "[INFO] Auto committing staged source snapshot ($ts)..."
  Run "git add -A"
  Run "git commit -m `"Source snapshot $ts`""
  Run "git push origin $SourceBranch"
} else {
  Write-Host "[INFO] Ziadne staged zmeny na $SourceBranch. Pokracujem..."
}

# 4) BUILD
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
  Write-Host "[ERR] Build nevytvoril .output/. Aborting."
  exit 1
}

# 5) SKOPIRUJ .output DO TEMP
$tmpOut = Join-Path $env:TEMP "nuxt-output-copy"
if (Test-Path $tmpOut) { Remove-Item $tmpOut -Recurse -Force }
New-Item -ItemType Directory -Path $tmpOut | Out-Null

$srcOut = Resolve-Path ".\.output"
$rc = robocopy $srcOut $tmpOut /MIR /NFL /NDL /NJH /NJS /NP
if ($LASTEXITCODE -ge 8) { Write-Host "[ERR] Robocopy to TEMP failed (exit $LASTEXITCODE)."; exit 1 }
Write-Host "[OK] .output copied to TEMP: $tmpOut"

# 6) NA SOURCE BRANCH: VYCISTI .output, aby checkout na dist nepadol
Write-Host "[INFO] Cleaning .output on $SourceBranch..."
try { git restore --staged .output 2>$null } catch {}
try { git checkout -- .output 2>$null } catch {}
if (Test-Path ".\.output") { Remove-Item ".\.output" -Recurse -Force }

# 7) PREPNI NA DIST VETVU (vytvor ak neexistuje)
Write-Host "[INFO] Switching to $DistBranch..."
$exists = (git rev-parse --verify $DistBranch 2>$null)
if (-not $?) {
  Run "git checkout -b $DistBranch"
} else {
  Run "git checkout $DistBranch"
}

# 8) NA DIST: ZMAZ VSETKO OKREM .git, SKOPIRUJ .output Z TEMP DO KORENA
Write-Host "[INFO] Cleaning dist worktree (except .git)..."
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force

Write-Host "[INFO] Copying .output to dist root..."
$rc2 = robocopy $tmpOut ".\" /MIR /NFL /NDL /NJH /NJS /NP
if ($LASTEXITCODE -ge 8) { Write-Host "[ERR] Robocopy to dist failed (exit $LASTEXITCODE)."; exit 1 }

# 9) COMMIT A PUSH OBSAHU DIST (bude tam len .output/)
Write-Host "[INFO] Committing and pushing dist..."
Run "git add -A"
$ts2 = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
Run "git commit -m `"Deploy .output from $SourceBranch $ts2`""
Run "git push origin $DistBranch"

# 10) NAVRAT NA SOURCE BRANCH
Write-Host "[INFO] Switching back to $SourceBranch..."
Run "git checkout $SourceBranch"

# 11) CLEANUP TEMP
if (Test-Path $tmpOut) { Remove-Item $tmpOut -Recurse -Force }

Write-Host "[OK] === Build-to-dist completed successfully ==="
