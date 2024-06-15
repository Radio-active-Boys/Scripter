#ifndef EXEC_H
#define EXEC_H
#include "common.h"

class Exec
{
public:
    static void exec_cmd(char cmd[],websocketpp::connection_hdl hdl,std::mutex *connection_list_mutex, ws_server* server,std::string prefix);
private:
    Exec() = default;
    ~Exec() = default;
};

#endif