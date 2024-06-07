#pragma once
#include "windowHandler.h"
#include "imguiInit.h"
#include "glad/glad.h"
#include <chrono>
#include <string>
class Application
{
public:
    Application();
    ~Application();
    void run();
    void putFPS();
private:
    WindowHandler *m_windowHandler = nullptr;
    IMGUI *m_imgui = nullptr;
    std::chrono::time_point<std::chrono::system_clock> m_lastTime;
    std::string m_graphicsCard;
};
