#include "file_handler.h"

void FileHandler::write_file(std::string path,std::string content)
{
    std::ofstream outFile(path);

    if (!outFile) {
        std::cerr << "Error: Could not open the file " << path << " for writing." << std::endl;
        return ;
    }

    outFile << content;
    outFile.close();
}