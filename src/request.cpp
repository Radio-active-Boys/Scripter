#include "request.h"

void Request::handle_request(std::string cmd, websocketpp::connection_hdl hdl, std::mutex *connection_list_mutex, ws_server *server)
{
    if(cmd=="get-board")
    {
        char command[] = "./arduino-cli core list";
        Exec::exec_cmd(command,hdl,connection_list_mutex, server);
    }
    else if(cmd=="get-port")
    {
        char command[] = "./arduino-cli board list";
        Exec::exec_cmd(command,hdl,connection_list_mutex, server);
    }
}