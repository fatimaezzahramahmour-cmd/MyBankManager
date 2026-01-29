@echo off
echo ========================================
echo    VERIFICATION DU BACKEND SPRING BOOT
echo ========================================
echo.

echo [1/6] Verification de la structure du projet...
if not exist "src\main\java\com\mybank\MyBankApplication.java" (
    echo ❌ Classe principale manquante
    goto :error
)
if not exist "src\main\java\com\mybank\model\" (
    echo ❌ Dossier model manquant
    goto :error
)
if not exist "src\main\java\com\mybank\controller\" (
    echo ❌ Dossier controller manquant
    goto :error
)
if not exist "src\main\java\com\mybank\service\" (
    echo ❌ Dossier service manquant
    goto :error
)
if not exist "src\main\java\com\mybank\repository\" (
    echo ❌ Dossier repository manquant
    goto :error
)
if not exist "src\main\java\com\mybank\dto\" (
    echo ❌ Dossier dto manquant
    goto :error
)
echo ✅ Structure du projet correcte

echo.
echo [2/6] Verification des fichiers de configuration...
if not exist "pom.xml" (
    echo ❌ pom.xml manquant
    goto :error
)
if not exist "src\main\resources\application.properties" (
    echo ❌ application.properties manquant
    goto :error
)
echo ✅ Fichiers de configuration présents

echo.
echo [3/6] Verification des entités JPA...
if not exist "src\main\java\com\mybank\model\User.java" (
    echo ❌ Entité User manquante
    goto :error
)
if not exist "src\main\java\com\mybank\model\BankAccount.java" (
    echo ❌ Entité BankAccount manquante
    goto :error
)
if not exist "src\main\java\com\mybank\model\Loan.java" (
    echo ❌ Entité Loan manquante
    goto :error
)
if not exist "src\main\java\com\mybank\model\CreditCard.java" (
    echo ❌ Entité CreditCard manquante
    goto :error
)
if not exist "src\main\java\com\mybank\model\Transaction.java" (
    echo ❌ Entité Transaction manquante
    goto :error
)
echo ✅ Toutes les entités JPA présentes

echo.
echo [4/6] Verification des contrôleurs...
if not exist "src\main\java\com\mybank\controller\AuthController.java" (
    echo ❌ AuthController manquant
    goto :error
)
if not exist "src\main\java\com\mybank\controller\LoanController.java" (
    echo ❌ LoanController manquant
    goto :error
)
if not exist "src\main\java\com\mybank\controller\CreditCardController.java" (
    echo ❌ CreditCardController manquant
    goto :error
)
if not exist "src\main\java\com\mybank\controller\AdminController.java" (
    echo ❌ AdminController manquant
    goto :error
)
echo ✅ Tous les contrôleurs présents

echo.
echo [5/6] Verification des services...
if not exist "src\main\java\com\mybank\service\UserService.java" (
    echo ❌ UserService manquant
    goto :error
)
if not exist "src\main\java\com\mybank\service\LoanService.java" (
    echo ❌ LoanService manquant
    goto :error
)
if not exist "src\main\java\com\mybank\service\CreditCardService.java" (
    echo ❌ CreditCardService manquant
    goto :error
)
echo ✅ Tous les services présents

echo.
echo [6/6] Verification des scripts...
if not exist "start_backend_spring.bat" (
    echo ❌ Script de démarrage manquant
    goto :error
)
if not exist "test_api_endpoints.bat" (
    echo ❌ Script de test manquant
    goto :error
)
if not exist "setup_database.sql" (
    echo ❌ Script de base de données manquant
    goto :error
)
echo ✅ Tous les scripts présents

echo.
echo ========================================
echo    ✅ BACKEND COMPLETEMENT CONFIGURÉ !
echo ========================================
echo.
echo 📋 Prochaines étapes:
echo    1. Configurer MySQL et créer la base 'mybankdb'
echo    2. Exécuter setup_database.sql
echo    3. Modifier application.properties si nécessaire
echo    4. Lancer start_backend_spring.bat
echo    5. Tester avec test_api_endpoints.bat
echo.
echo 🚀 URLs importantes:
echo    - Serveur: http://localhost:8080
echo    - API Base: http://localhost:8080/api
echo    - Test Auth: http://localhost:8080/api/auth/test
echo.
goto :end

:error
echo.
echo ❌ ERREUR: Configuration incomplète
echo Veuillez vérifier les fichiers manquants
echo.
pause
exit /b 1

:end
echo ✅ Vérification terminée avec succès !
pause
