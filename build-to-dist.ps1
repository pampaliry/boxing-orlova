# build-to-dist.ps1

# Kontrola prítomnosti .env a požadovaných premenných
$envPath = ".env"
if (!(Test-Path $envPath)) {
  Write-Host ".env file is missing. Make sure it exists in the project root."
  exit 1
}

$envContent = Get-Content $envPath | Where-Object { $_ -match "=" }
$requiredKeys = @("MAIL_USER", "MAIL_PASS", "MAIL_TO")
foreach ($key in $requiredKeys) {
  if (-not ($envContent -match "^$key\s*=")) {
    Write-Host "Missing required key in .env: $key"
    exit 1
  }
}

Write-Host "Environment variables verified."

# Spustenie buildu
Write-Host "Starting Nuxt build..."
npm run build

if ($LASTEXITCODE -ne 0) {
  Write-Host "Build failed. Exiting."
  exit 1
}

# Commit build do main vetvy
Write-Host "Committing .output to main..."
git add .
git add .\.output
git add -f .\.output\server\node_modules
git commit -m "Build commit"
git push origin main

# Prepnutie na dist vetvu
Write-Host "Switching to dist branch..."
git checkout dist

# Prenos buildnutého výstupu zo späť z main
Write-Host "Copying .output from main..."
git checkout main -- .output

# Commit a push do dist vetvy
Write-Host "Committing and pushing to dist..."
git add -f .output
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Deploy from latest main ($timestamp)"
git push origin dist

# Návrat na hlavnú vetvu
Write-Host "Switching back to main..."
git checkout main

Write-Host "Deployment completed. Checking git status:"
git status
