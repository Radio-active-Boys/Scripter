#include "exec.h"

void Exec::exec_cmd( char cmd[],websocketpp::connection_hdl hdl,std::mutex *connection_list_mutex,  ws_server* server,std::string prefix)
{
    std::lock_guard<std::mutex> guard(*connection_list_mutex);
    HANDLE hOutputRead, hOutputWrite;
    SECURITY_ATTRIBUTES sa = {sizeof(SECURITY_ATTRIBUTES), NULL, TRUE};

    if (!CreatePipe(&hOutputRead, &hOutputWrite, &sa, 0)) {
        std::cerr << "CreatePipe failed" << std::endl;
        return ;
    }

    STARTUPINFO si = {sizeof(STARTUPINFO)};
    si.dwFlags = STARTF_USESTDHANDLES;
    si.hStdOutput = hOutputWrite;
    si.hStdError = hOutputWrite;

    PROCESS_INFORMATION pi;

    if (!CreateProcess(NULL, cmd, NULL, NULL, TRUE, 0, NULL, NULL, &si, &pi)) {
        std::cerr << "CreateProcess failed" << std::endl;
        return ;
    }

    CloseHandle(hOutputWrite); // Close the write end of the pipe in the parent
    char buffer[1024*64];
    if(prefix.size() == 3)
    {
        buffer[0] = prefix[0];
        buffer[1] = prefix[1];
        buffer[2] = prefix[2];
    }
    DWORD bytesRead;
    while (ReadFile(hOutputRead, buffer+3*(prefix.size() == 3), sizeof(buffer) - 1 - 3*(prefix.size() == 3), &bytesRead, NULL) && bytesRead > 0) {
        buffer[bytesRead + 3*(prefix.size() == 3)] = '\0';
        
        std::cout << buffer;
        
        server->send(hdl, buffer, websocketpp::frame::opcode::text);
    }

    CloseHandle(hOutputRead);
    WaitForSingleObject(pi.hProcess, INFINITE);
    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);    

}