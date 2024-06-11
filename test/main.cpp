#define WIN32_LEAN_AND_MEAN

#include <winsock2.h>
#include <ws2tcpip.h>
#include <iostream>
#include <string>

// Link with Ws2_32.lib
#pragma comment(lib, "Ws2_32.lib")

int main() {
    WSADATA wsaData;
    int iResult;

    // Initialize Winsock
    iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
    if (iResult != 0) {
        std::cerr << "WSAStartup failed: " << iResult << std::endl;
        return 1;
    }

    // Create a socket
    SOCKET ListenSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (ListenSocket == INVALID_SOCKET) {
        std::cerr << "Error at socket(): " << WSAGetLastError() << std::endl;
        WSACleanup();
        return 1;
    }

    // Setup the TCP listening socket
    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = INADDR_ANY;
    serverAddr.sin_port = htons(8080);

    iResult = bind(ListenSocket, (sockaddr*)&serverAddr, sizeof(serverAddr));
    if (iResult == SOCKET_ERROR) {
        std::cerr << "bind failed: " << WSAGetLastError() << std::endl;
        closesocket(ListenSocket);
        WSACleanup();
        return 1;
    }

    iResult = listen(ListenSocket, SOMAXCONN);
    if (iResult == SOCKET_ERROR) {
        std::cerr << "listen failed: " << WSAGetLastError() << std::endl;
        closesocket(ListenSocket);
        WSACleanup();
        return 1;
    }

    std::cout << "Server is listening on port 8080..." << std::endl;

    while (true) {
        // Accept a client socket
        SOCKET ClientSocket = accept(ListenSocket, NULL, NULL);
        if (ClientSocket == INVALID_SOCKET) {
            std::cerr << "accept failed: " << WSAGetLastError() << std::endl;
            closesocket(ListenSocket);
            WSACleanup();
            return 1;
        }

        std::cout << "Client connected!" << std::endl;

        // Receive data
        const int recvbuflen = 1024;
        char recvbuf[recvbuflen];
        std::string message;

        do {
            iResult = recv(ClientSocket, recvbuf, recvbuflen, 0);
            if (iResult > 0) {
                recvbuf[iResult] = '\0';  // Null-terminate the received data
                message += recvbuf;
                std::cout<<message<<std::endl;
            } else if (iResult == 0) {
                std::cout << "Connection closing..." << std::endl;
            } else {
                std::cerr << "recv failed: " << WSAGetLastError() << std::endl;
            }
        } while (iResult > 0);

        // Find the body of the message by locating the CRLF CRLF sequence
        size_t bodyPos = message.find("\r\n\r\n");
        if (bodyPos != std::string::npos) {
            // Print the body, skipping the CRLF CRLF sequence
            std::string body = message.substr(bodyPos + 4);
            std::cout << "Body received: " << body << std::endl;

            // Echo the body back to the client
            std::string response = "HTTP/1.1 200 OK\r\n"
                                   "Content-Type: text/plain\r\n"
                                   "Content-Length: " + std::to_string(body.size()) + "\r\n"
                                   "\r\n" + body;
            send(ClientSocket, response.c_str(), response.size(), 0);
        } else {
            std::cout << "No headers found, received: " << message << std::endl;
        }

        // Cleanup client socket
        closesocket(ClientSocket);
    }

    // Cleanup listening socket
    closesocket(ListenSocket);
    WSACleanup();

    return 0;
}
