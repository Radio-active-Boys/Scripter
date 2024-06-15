#include "request.h"

void Request::handle_request(std::string cmd, websocketpp::connection_hdl hdl, std::mutex *connection_list_mutex, ws_server *server)
{
    if(cmd=="get-board")
    {
        char command[] = "./arduino-cli board listall";
        Exec::exec_cmd(command,hdl,connection_list_mutex, server,"");
    }
    else if(cmd=="get-port")
    {
        char command[] = "./arduino-cli board list";
        Exec::exec_cmd(command,hdl,connection_list_mutex, server,"");
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
                char cmd_delete[] = "rm Project/Project.ino";
                std::string cmd_compile = (char*)(std::string("./arduino-cli compile --fqbn ") + doc["Board"].GetString() + std::string(" Project")).c_str();
                std::cout<<cmd_compile<<std::endl;
                Exec::exec_cmd(command,hdl,connection_list_mutex, server,"PRJ");
                Exec::exec_cmd(cmd_delete,hdl,connection_list_mutex, server,"DEL");
                FileHandler::write_file("Project/Project.ino",doc["Code"].GetString());
                // std::this_thread::sleep_for(std::chrono::seconds(2));
                Exec::exec_cmd((char*)cmd_compile.c_str(),hdl,connection_list_mutex, server,"CPL");
            }

            else if ((std::string)doc["Type"].GetString()=="Upload")
            {
                char command[] = "./arduino-cli sketch new Project";
                char cmd_delete[] = "rm Project/Project.ino";
                std::string cmd_compile = (char*)(std::string("./arduino-cli compile --fqbn ") + doc["Board"].GetString() + std::string(" Project")).c_str();
                Exec::exec_cmd(command,hdl,connection_list_mutex, server,"PRJ");
                Exec::exec_cmd(cmd_delete,hdl,connection_list_mutex, server,"DEL");
                FileHandler::write_file("Project/Project.ino",doc["Code"].GetString());
                Exec::exec_cmd((char*)cmd_compile.c_str(),hdl,connection_list_mutex, server,"CPL");
                std::string cmd_upload = (char*)(std::string("./arduino-cli upload --fqbn ") + doc["Board"].GetString() + std::string(" -p ")+doc["Port"].GetString() +std::string(" Project")).c_str();
                std::cout<<cmd_upload<<std::endl;
                Exec::exec_cmd((char*)cmd_upload.c_str(),hdl,connection_list_mutex, server,"UPD");

            }
            
            
        }
    }
}