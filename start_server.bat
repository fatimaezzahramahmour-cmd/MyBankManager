@echo off
echo Starting local server...
echo.
echo Access your site at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try to use Python if available
python -m http.server 8080 2>nul
if %errorlevel% neq 0 (
    echo Python not found, trying alternative...
    REM Try to use Node.js if available
    npx http-server -p 8080 -o 2>nul
    if %errorlevel% neq 0 (
        echo No server found. Please install Python or Node.js
        pause
    )
) 