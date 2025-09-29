# build-to-dist.ps1
# Cieľ: z master urobiť build a pushnúť vetvu "dist", ktorá obsahuje len priečinok .output/
# Bez prepínania vetiev v pracovnom strome; používa dočasný git worktree.

param(
  [string]$SourceBranch = "master",
  [string]$DistBranch = "dist",
  [switch]$SkipEnvCheck,
  [switch]$UseNpm
)

$ErrorActionPreference = "Stop"

function Run([string]$cmd) {
  Write-Host ">> $cmd"
  iex $cmd
  if ($LASTEXITCODE -ne 0) { throw "Command failed: $cmd" }
}

# 0) over git a vetvu
git rev-parse --is-inside-work-tree | Out-Null
$current = (git branch --show-current).Trim()
if ($current -ne $SourceBranch) {
  throw "Si na '$current'. Buď sa prepni na '$SourceBranch', alebo použi -SourceBranch $current."
}

# 1) workspace musí byť čistý (nechtiac by si nezapísal iné zmeny)
if (git status --porcelain) {
  throw "Necommitnuté zmeny v zdrojovej vetve. Urob commit/stash."
}

# 2) env kontrola (voliteľné)
if (-not $SkipEnvCheck) {
  $envPath = ".env"
  if (!(Test-Path $envPath)) { throw ".env chýba v projekte." }
  $envContent = Get-Content $envPath | Where-Object { $_ -match "=" }
  foreach ($k in @("MAIL_USER","MAIL_PASS","MAIL_TO")) {
    if (-not ($envContent -match "^$k\s*=")) { throw "Chýba $k v .env" }
  }
  Write-Host "Env OK."
}

# 3) build (prefer pnpm)
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
  try { Run "pnpm approve-builds" } catch { Write-Host "(approve-builds nie je potrebné)" }
  Run "pnpm install --frozen-lockfile"
  Run "pnpm build"
} else {
  Run "npm ci"
  Run "npm run build"
}

if (!(Test-Path ".output")) { throw "Build nevytvoril .output/" }

# 4) dočasný worktree pre dist (do %TEMP%)
$workRoot = Join-Path $env:TEMP "boxing-orlova-dist"
if (Test-Path $workRoot) { Remove-Item $workRoot -Recurse -Force }

# -B vytvorí/aktualizuje referenciu vetvy na HEAD zdrojovej vetvy
Run "git worktree add -B $DistBranch `"$workRoot`" $SourceBranch"

Push-Location $workRoot
try {
  # 5) prepni na dist (ak ju -B nevytvoril priamo)
  try { Run "git checkout $DistBranch" } catch { }

  # 6) vyčisti všetko okrem .git
  Get-ChildItem -Path . -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force

  # 7) skopíruj .output/ do koreňa dist
  New-Item -ItemType Directory -Force -Path ".output" | Out-Null
  $src = Resolve-Path (Join-Path (Split-Path -Path $PSCommandPath -Parent | Split-Path -Parent) ".output")
  # ↑ $src = .output v pôvodnom pracovnom strome (nie vo worktree)

  $rc = robocopy $src ".\ .output" /MIR /NFL /NDL /NJH /NJS /NP
  if ($LASTEXITCODE -ge 8) { throw "Robocopy zlyhalo (exit $LASTEXITCODE)" }

  # 8) commit + push len .output/
  Run "git add -A"
  $ts = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
  Run "git commit -m `"Deploy .output ($ts)`""
  try { Run "git push -u origin $DistBranch" } catch { Run "git push origin $DistBranch" }

} finally {
  Pop-Location
  Run "git worktree remove `"$workRoot`" --force"
}

Write-Host "Hotovo: dist vetva aktualizovaná, obsahuje .output/ pripravené pre serverový cron."
