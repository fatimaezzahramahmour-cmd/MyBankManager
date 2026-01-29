@echo off
echo ========================================
echo   CREATION STRUCTURE BACKEND COMPLETE
echo ========================================
echo.

echo [1/10] Creation du repertoire principal...
mkdir "src-complete" 2>nul
mkdir "src-complete\main" 2>nul
mkdir "src-complete\main\java" 2>nul
mkdir "src-complete\main\java\com" 2>nul
mkdir "src-complete\main\java\com\mybankmanager" 2>nul
mkdir "src-complete\main\resources" 2>nul
mkdir "src-complete\test" 2>nul
mkdir "src-complete\test\java" 2>nul
mkdir "src-complete\test\java\com" 2>nul
mkdir "src-complete\test\java\com\mybankmanager" 2>nul

echo [2/10] Creation des packages principaux...
mkdir "src-complete\main\java\com\mybankmanager\config" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\controller" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\service" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\repository" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\entity" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\dto" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\mapper" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\security" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\exception" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\util" 2>nul

echo [3/10] Creation des sous-packages...
mkdir "src-complete\main\java\com\mybankmanager\controller\api" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\controller\admin" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\service\impl" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\dto\request" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\dto\response" 2>nul
mkdir "src-complete\main\java\com\mybankmanager\security\jwt" 2>nul

echo [4/10] Creation des packages de test...
mkdir "src-complete\test\java\com\mybankmanager\controller" 2>nul
mkdir "src-complete\test\java\com\mybankmanager\service" 2>nul
mkdir "src-complete\test\java\com\mybankmanager\repository" 2>nul
mkdir "src-complete\test\java\com\mybankmanager\integration" 2>nul

echo [5/10] Creation du repertoire resources...
mkdir "src-complete\main\resources\db" 2>nul
mkdir "src-complete\main\resources\db\migration" 2>nul
mkdir "src-complete\main\resources\templates" 2>nul
mkdir "src-complete\main\resources\static" 2>nul
mkdir "src-complete\main\resources\static\css" 2>nul
mkdir "src-complete\main\resources\static\js" 2>nul
mkdir "src-complete\main\resources\static\images" 2>nul

echo [6/10] Creation du repertoire de test resources...
mkdir "src-complete\test\resources" 2>nul

echo [7/10] Creation des repertoires d'uploads et logs...
mkdir "uploads" 2>nul
mkdir "logs" 2>nul
mkdir "backups" 2>nul

echo [8/10] Copie des fichiers de configuration...
copy "pom_complete.xml" "pom-complete.xml" >nul 2>&1
copy "application_complete.properties" "src-complete\main\resources\application.properties" >nul 2>&1

echo [9/10] Creation des fichiers de migration...
copy "database_complete_structure.sql" "src-complete\main\resources\db\migration\V1__Initial_Schema.sql" >nul 2>&1
copy "database_initial_data.sql" "src-complete\main\resources\db\migration\V2__Initial_Data.sql" >nul 2>&1

echo [10/10] Creation du README...
echo # MyBankManager Complete Backend > "src-complete\README.md"
echo. >> "src-complete\README.md"
echo Architecture backend complete avec Spring Boot 3 >> "src-complete\README.md"
echo. >> "src-complete\README.md"
echo ## Structure >> "src-complete\README.md"
echo - MVC avec separation des couches >> "src-complete\README.md"
echo - Securite JWT + Spring Security >> "src-complete\README.md"
echo - Base de donnees MySQL avec Flyway >> "src-complete\README.md"
echo - Documentation Swagger >> "src-complete\README.md"
echo - Tests unitaires et integration >> "src-complete\README.md"

echo.
echo ========================================
echo   STRUCTURE CREEE AVEC SUCCES !
echo ========================================
echo.
echo 📁 REPERTOIRE : src-complete/
echo.
echo 📦 PACKAGES CREES :
echo   ✅ config        - Configuration Spring
echo   ✅ controller    - Contrôleurs REST
echo   ✅ service       - Logique métier
echo   ✅ repository    - Accès données
echo   ✅ entity        - Entités JPA
echo   ✅ dto           - Objets de transfert
echo   ✅ mapper        - Mapping automatique
echo   ✅ security      - Sécurité JWT
echo   ✅ exception     - Gestion erreurs
echo   ✅ util          - Utilitaires
echo.
echo 📋 FICHIERS CREES :
echo   ✅ pom-complete.xml
echo   ✅ application.properties
echo   ✅ V1__Initial_Schema.sql
echo   ✅ V2__Initial_Data.sql
echo   ✅ README.md
echo.
echo 🎯 PROCHAINES ETAPES :
echo   1. Creer les entités JPA
echo   2. Implementer les repositories
echo   3. Developper les services
echo   4. Creer les contrôleurs REST
echo   5. Configurer la sécurité JWT
echo   6. Ajouter la documentation Swagger
echo   7. Implementer les tests
echo.
pause
