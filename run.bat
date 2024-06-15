@echo off

REM Navigate to the build directory
cd build

REM Build the solution
msbuild Scripter.sln /p:Platform="x64" /p:Configuration=Debug

REM Check if the build succeeded before proceeding
IF ERRORLEVEL 1 (
    echo Build failed
    exit /b 1
)

REM Navigate to the Debug directory
cd Debug

REM Copy the executable and pdb files to the bin directory
copy Scripter.exe ..\..\bin\
copy Scripter.pdb ..\..\bin\

REM Navigate to the bin directory
cd ..\..\bin

REM Run the executable
Scripter
