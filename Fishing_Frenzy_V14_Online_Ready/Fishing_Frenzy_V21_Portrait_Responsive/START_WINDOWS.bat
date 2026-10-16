@echo off
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
 echo Please install Node.js LTS from https://nodejs.org/
 pause
 exit /b
)
start "" "http://localhost:3000/teacher.html"
node server.js
pause
