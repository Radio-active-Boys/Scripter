#include "application.h"
#ifdef DEBUG
#include<iostream>
#endif
int main()
{
    Application app{};
    #ifdef DEBUG
    std::cout<<"Running..."<<std::endl;
    #endif
    app.run();
    return 0;
}