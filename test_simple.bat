@echo off
echo ========================================
echo TEST API SIMPLE
echo ========================================

echo.
echo 1. Test endpoint de base...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/test' -Method GET; Write-Host 'Serveur fonctionne:' $response.message } catch { Write-Host 'Erreur serveur:' $_.Exception.Message }"

echo.
echo 2. Test connexion client...
powershell -Command "$body = @{email='client@example.com'; password='client123'} | ConvertTo-Json; try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/login' -Method POST -Body $body -ContentType 'application/json'; Write-Host 'Connexion reussie. Token:' $response.token } catch { Write-Host 'Erreur connexion:' $_.Exception.Message }"

echo.
echo 3. Test acces refuse (403)...
powershell -Command "$headers = @{'Authorization'='Bearer client_token_67890'; 'Content-Type'='application/json'}; try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/admin/demandes' -Method GET -Headers $headers; Write-Host 'ERREUR: Acces aurait du etre refuse!' } catch { $statusCode = $_.Exception.Response.StatusCode.value__; if ($statusCode -eq 403) { Write-Host 'Acces refuse correctement (403)' } else { Write-Host 'Code erreur inattendu:' $statusCode } }"

echo.
echo ========================================
echo Test termine
echo ========================================

pause
