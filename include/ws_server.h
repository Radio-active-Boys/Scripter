#ifndef SERVER_H
#define SERVER_H
#include "common.h"
#include "request.h"
class Server
{
public:
    Server() = default;
    void run(unsigned int PORT);
    void on_message(websocketpp::connection_hdl hdl, ws_server::message_ptr msg);
    void on_open(websocketpp::connection_hdl hdl);
    void on_close(websocketpp::connection_hdl hdl);
    void send_message(websocketpp::connection_hdl hdl,const std::string& message);
            
    ~Server(){};
private:
    ws_server m_server;
    std::mutex m_connection_list_mutex;
    std::set<websocketpp::connection_hdl, std::owner_less<websocketpp::connection_hdl>> m_connections;
};

#endif