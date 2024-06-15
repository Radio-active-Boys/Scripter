#include <iostream>
#include <string>
#include "rapidjson/document.h"
int main() {

    std::string data = "{\n\"name\":\"Ashutosh\",\n\"age\":18\n}";
    std::cout<<data<<std::endl;
    rapidjson::Document doc;
    doc.Parse(data.c_str());
    if (doc.HasParseError()) { 
        std::cerr << "Error parsing JSON: "
             << doc.GetParseError() << std::endl; 
        return 1; 
    } 
    std::cout<<"Name: "<<doc["name"].GetString()<<std::endl;
    std::cout<<"Age: "<<doc["age"].GetInt()<<std::endl;
    return 0;
}