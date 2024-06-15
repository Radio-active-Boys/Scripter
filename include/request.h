#ifndef REQUEST_H
#define REQUEST_H
#include "common.h"
#include "exec.h"
#include "file_handler.h"
class Request
{

public:
    static void handle_request(std::string cmd, websocketpp::connection_hdl hdl, std::mutex *connection_list_mutex, ws_server *server);
private:
    Request()=default;
    ~Request()=default;
};

#endif