# Test API MyBankManager
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🔧 TEST API MYBANKMANAGER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Test 1: Endpoint de base
Write-Host "`n1. Test endpoint de base..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/api/test" -Method GET
    Write-Host "✅ Serveur fonctionne: $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur serveur: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Connexion client
Write-Host "`n2. Test connexion client..." -ForegroundColor Yellow
$loginBody = @{
    email = "client@example.com"
    password = "client123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/api/login" -Method POST -Body $loginBody -ContentType "application/json"
    Write-Host "✅ Connexion client réussie" -ForegroundColor Green
    Write-Host "   Token: $($response.token)" -ForegroundColor Gray
    $clientToken = $response.token
} catch {
    Write-Host "❌ Erreur connexion client: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 3: Accès refusé avec token client
Write-Host "`n3. Test accès refusé (403)..." -ForegroundColor Yellow
$headers = @{
    "Authorization" = "Bearer $clientToken"
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/api/admin/demandes" -Method GET -Headers $headers
    Write-Host "❌ ERREUR: L'accès aurait dû être refusé!" -ForegroundColor Red
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 403) {
        Write-Host "✅ Accès refusé correctement (403)" -ForegroundColor Green
        Write-Host "   Message: $($_.Exception.Message)" -ForegroundColor Gray
    } else {
        Write-Host "❌ Code d'erreur inattendu: $statusCode" -ForegroundColor Red
    }
}

# Test 4: Connexion admin
Write-Host "`n4. Test connexion admin..." -ForegroundColor Yellow
$adminLoginBody = @{
    email = "admin@mybank.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/api/login" -Method POST -Body $adminLoginBody -ContentType "application/json"
    Write-Host "✅ Connexion admin réussie" -ForegroundColor Green
    Write-Host "   Token: $($response.token)" -ForegroundColor Gray
    $adminToken = $response.token
} catch {
    Write-Host "❌ Erreur connexion admin: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 5: Accès autorisé avec token admin
Write-Host "`n5. Test accès autorisé admin..." -ForegroundColor Yellow
$adminHeaders = @{
    "Authorization" = "Bearer $adminToken"
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/api/admin/demandes" -Method GET -Headers $adminHeaders
    Write-Host "✅ Accès admin autorisé (200)" -ForegroundColor Green
    Write-Host "   Nombre de demandes: $($response.demandes.Count)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Erreur accès admin: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✅ Tests terminés" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan




