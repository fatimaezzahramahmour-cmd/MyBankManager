@echo off
echo Starting MyBankManager Backend...
echo.

cd Mybankmanager

echo Checking Java installation...
java -version
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Compiling and starting the application...
call mvnw.cmd spring-boot:run

pause 