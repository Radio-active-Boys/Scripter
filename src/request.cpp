#include "request.h"

void Request::handle_request(std::string cmd, websocketpp::connection_hdl hdl, std::mutex *connection_list_mutex, ws_server *server)
{
    if(cmd=="get-board")
    {
        char command[] = "./arduino-cli board listall";
        Exec::exec_cmd(command,hdl,connection_list_mutex, server);
    }
    else if(cmd=="get-port")
    {
        char command[] = "./arduino-cli board list";
        Exec::exec_cmd(command,hdl,connection_list_mutex, server);
    }
    else if(cmd[0]=='{')
    {
        rapidjson::Document doc;
        doc.Parse(cmd.c_str());
        if (doc.HasParseError()) 
        { 
            std::cerr << "Error parsing JSON: "
                << doc.GetParseError() << std::endl; 
            return;
        }
        if(doc.HasMember("Board") && doc.HasMember("Port"))
        {
            if((std::string)doc["Type"].GetString()=="Compile")
            {
                char command[] = "./arduino-cli sketch new Project";
                Exec::exec_cmd(command,hdl,connection_list_mutex, server);
                
            }
            else if ((std::string)doc["Type"].GetString()=="Upload")
            {
                /* code */
            }
            
            
        }
    }
}