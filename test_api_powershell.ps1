# Tests API PowerShell - MyBankManager
# Alternative moderne à Postman

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TESTS API POWERSHELL - MyBankManager" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$API_URL = "http://localhost:8080/api"
$headers = @{
    "Content-Type" = "application/json"
}

# Fonction pour tester une requête
function Test-ApiEndpoint {
    param(
        [string]$Method,
        [string]$Endpoint,
        [object]$Body = $null,
        [string]$Description
    )
    
    Write-Host "[$Description]" -ForegroundColor Yellow
    Write-Host "$Method $Endpoint" -ForegroundColor White
    
    try {
        $params = @{
            Uri = "$API_URL$Endpoint"
            Method = $Method
            Headers = $headers
            TimeoutSec = 10
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json -Depth 3)
        }
        
        $response = Invoke-RestMethod @params
        Write-Host "✓ Status: 200 OK" -ForegroundColor Green
        Write-Host ($response | ConvertTo-Json -Depth 3) -ForegroundColor Gray
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.Value__
        Write-Host "✗ Status: $statusCode" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
    Write-Host ""
}

# Test 1: Vérification du serveur
Write-Host "[1/8] Verification du serveur..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$API_URL/health" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✓ Serveur accessible" -ForegroundColor Green
}
catch {
    Write-Host "✗ Serveur non accessible" -ForegroundColor Red
    Write-Host "Demarrez le backend Spring Boot avec: .\start_backend_spring.bat" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Test 2: Inscription utilisateur
$registerData = @{
    fullName = "Test User PowerShell"
    email = "testps@example.com"
    telephone = "0612345678"
    password = "password123"
}
Test-ApiEndpoint -Method "POST" -Endpoint "/auth/register" -Body $registerData -Description "2/8 Inscription utilisateur"

# Test 3: Connexion utilisateur
$loginData = @{
    email = "testps@example.com"
    password = "password123"
}
Test-ApiEndpoint -Method "POST" -Endpoint "/auth/login" -Body $loginData -Description "3/8 Connexion utilisateur"

# Test 4: Demande de prêt
$loanData = @{
    userEmail = "testps@example.com"
    amount = 50000
    duration = 36
    type = "personnel"
    monthlyIncome = 8000
}
Test-ApiEndpoint -Method "POST" -Endpoint "/loans" -Body $loanData -Description "4/8 Demande de pret"

# Test 5: Liste des prêts
Test-ApiEndpoint -Method "GET" -Endpoint "/loans" -Description "5/8 Liste des prets"

# Test 6: Demande de carte
$cardData = @{
    userEmail = "testps@example.com"
    cardType = "gold"
    creditLimit = 10000
    monthlyIncome = 8000
}
Test-ApiEndpoint -Method "POST" -Endpoint "/creditcards" -Body $cardData -Description "6/8 Demande de carte"

# Test 7: Liste des cartes
Test-ApiEndpoint -Method "GET" -Endpoint "/creditcards" -Description "7/8 Liste des cartes"

# Test 8: Liste des utilisateurs (admin)
Test-ApiEndpoint -Method "GET" -Endpoint "/admin/users" -Description "8/8 Liste des utilisateurs"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TESTS API TERMINES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Codes de statut HTTP:" -ForegroundColor White
Write-Host "- 200/201: ✓ Succès" -ForegroundColor Green
Write-Host "- 400: ✗ Erreur de requête" -ForegroundColor Red
Write-Host "- 404: ✗ Endpoint non trouvé" -ForegroundColor Red
Write-Host "- 500: ✗ Erreur serveur" -ForegroundColor Red
Write-Host ""
Write-Host "Si vous obtenez des erreurs:" -ForegroundColor Yellow
Write-Host "1. Verifiez que le backend est demarre" -ForegroundColor White
Write-Host "2. Verifiez que MySQL est en cours d'execution" -ForegroundColor White
Write-Host "3. Verifiez que la base 'mybankdb' existe" -ForegroundColor White

Read-Host "Appuyez sur Entree pour continuer"
