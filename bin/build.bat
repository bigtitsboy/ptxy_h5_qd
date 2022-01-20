@echo off
echo.
echo Building now, please wait.
echo.

%~d0
cd %~dp0

cd ..
npm run build

pause