# build-to-dist.ps1
# Nuxt build a deploy skript (rovnaky flow ako nuxt-portfolio)
# - Krok 1: kontrola .env a gitu (staged OK, untracked/unstaged STOP)
# - Auto-commit staged zdrojov s ISO casom + push na remote
# - Build -> .output
# - Commit .output do source vetvy (master) + push
# - Checkout na dist, vytiahnutie .output zo source, commit a push
# - Navrat na source vetvu
# POZN: .output NESMIE byt v .gitignore pre tento flow

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

# 0) git repo a vetva
Run "git rev-parse --is-inside-work-tree"
$currentBranch = (git branch --show-current).Trim()
if (-not $currentBranch) { throw "[ERR] Not on any branch" }
if ($currentBranch -ne $SourceBranch) {
  Write-Host "[INFO] Switching to $SourceBranch..."
  Run "git checkout $SourceBranch"
}

# 1) .env kontrola
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

# === ADDED: FORCE PORT FOR NITRO/NODE-LISTENER ================================
Write-Host "[INFO] Setting custom port for build: 3001"

$Env:PORT = "3001"
$Env:NITRO_PORT = "3001"
$Env:NITRO_HOST = "0.0.0.0"

Write-Host "  PORT=$Env:PORT"
Write-Host "  NITRO_PORT=$Env:NITRO_PORT"
Write-Host "  NITRO_HOST=$Env:NITRO_HOST"
# ==============================================================================

# 2) git kontrola: unstaged/untracked = STOP
$porcelain = git status --porcelain
$lines = ($porcelain -split "`n") | Where-Object { $_ -ne "" }

$hasDirty = $false
foreach ($l in $lines) {
  if ($l.Length -ge 2) {
    $x = $l.Substring(0,1)
    $y = $l.Substring(1,1)
    if ($l.StartsWith("??") -or $y -ne " ") { $hasDirty = $true; break }
  }
}

if ($hasDirty) {
  Write-Host "[WARN] Unstaged alebo untracked zmeny detekovane. Najprv pouzi git add."
  git status
  exit 1
}

# 3) auto commit staged
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

# 4) build
Write-Host "[INFO] Starting Nuxt build..."
if (-not $UseNpm -and (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  Run "pnpm install --frozen-lockfile"
  Run "pnpm run build"
} else {
  Run "npm ci"
  Run "npm run build"
}

if (!(Test-Path ".output")) {
  Write-Host "[ERR] Build nevytvoril .output/. Aborting."
  exit 1
}

# 5) commit .output
Write-Host "[INFO] Committing .output on $SourceBranch..."
Run "git add -f .output"
if (Test-Path ".\.output\server\node_modules") {
  Run "git add -f .\.output\server\node_modules"
}
$ts2 = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
Run "git commit -m `"Build commit (.output) $ts2`""
Run "git push origin $SourceBranch"

# 6) checkout dist branch
Write-Host "[INFO] Switching to $DistBranch..."
$exists = $false
try { git rev-parse --verify $DistBranch 2>$null | Out-Null; if ($LASTEXITCODE -eq 0) { $exists = $true } } catch {}
if ($exists) { Run "git checkout $DistBranch" } else { Run "git checkout -b $DistBranch" }

# 7) copy .output
Write-Host "[INFO] Copying .output from $SourceBranch to $DistBranch..."
Run "git checkout $SourceBranch -- .output"

# 8) commit dist
Write-Host "[INFO] Committing and pushing to $DistBranch..."
Run "git add -f .output"
$ts3 = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
Run "git commit -m `"Deploy from latest $SourceBranch ($ts3)`""
Run "git push origin $DistBranch"

# 9) return to source
Write-Host "[INFO] Switching back to $SourceBranch..."
Run "git checkout $SourceBranch"

Write-Host "[OK] === Build-to-dist completed successfully ==="
