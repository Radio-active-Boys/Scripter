echo off
cd build
msbuild Scripter.sln /p:Platform="x64" /p:Configuration=Debug
cd Debug
cp Scripter.exe ../../bin
cp Scripter.pdb ../../bin

cd ../../bin
Scripter