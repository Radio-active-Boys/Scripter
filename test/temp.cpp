// #include <windows.h>
// #include <iostream>
// #include <string>

// int main() {
//     // Path to the executable
//     LPCSTR programPath = "C:\\Users\\Asus\\Documents\\Scripter\\bin\\arduino-cli.exe";

//     // Command line arguments
//     std::string arguments = "board list";

//     // Full command line (program path + arguments)
//     std::string commandLine = std::string(programPath) + " " + arguments;

//     // Initialize the STARTUPINFO structure
//     STARTUPINFOA si;
//     ZeroMemory(&si, sizeof(si));
//     si.cb = sizeof(si);

//     // Initialize the PROCESS_INFORMATION structure
//     PROCESS_INFORMATION pi;
//     ZeroMemory(&pi, sizeof(pi));

//     // Create the process
//     BOOL success = CreateProcessA(
//         programPath,       // Path to the executable
//         commandLine.data(),// Command line arguments
//         NULL,              // Process handle not inheritable
//         NULL,              // Thread handle not inheritable
//         FALSE,             // Set handle inheritance to FALSE
//         0,                 // No creation flags
//         NULL,              // Use parent's environment block
//         NULL,              // Use parent's starting directory 
//         &si,               // Pointer to STARTUPINFO structure
//         &pi                // Pointer to PROCESS_INFORMATION structure
//     );

//     // Check if the process was created successfully
//     if (success) {
//         // Wait until the process exits
//         WaitForSingleObject(pi.hProcess, INFINITE);

//         // Get the exit code
//         DWORD exitCode;
//         GetExitCodeProcess(pi.hProcess, &exitCode);

//         std::cout << "Program executed successfully with exit code: " << exitCode << std::endl;

//         // Close process and thread handles
//         CloseHandle(pi.hProcess);
//         CloseHandle(pi.hThread);
//     } else {
//         std::cerr << "Failed to execute program. Error code: " << GetLastError() << std::endl;
//     }

//     return 0;
// }
