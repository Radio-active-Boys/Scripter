#ifndef FILE_HANDLER_H
#define FILE_HANDLER_H
#include "common.h"
class FileHandler
{
public:
    static void write_file(std::string &path,std::string &content);
private:
    FileHandler() = default;
    ~FileHandler() = default;

};
#endif