#include "application.h"
Application::Application()
{
    this->m_windowHandler = new WindowHandler("Scripter");
    this->m_imgui = new IMGUI(m_windowHandler->getWindow());
    this->m_graphicsCard = std::string((char*)glGetString(GL_RENDERER));
}

Application::~Application()
{
    delete m_windowHandler;
    delete m_imgui;
}

void Application::run()
{
   
    auto currentTime = std::chrono::system_clock::now();
   
    while (!m_windowHandler->closeWindow())
    {
        m_imgui->IMGUIStart();
        glClearColor(0.0f, 0.0f, 0.0f, 0.0f);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        m_windowHandler->processInput();
        // m_imgui->renderUI(f);
        m_imgui->IMGUIRender();
        this->putFPS();
        glfwSwapBuffers(m_windowHandler->getWindow());
        glfwPollEvents();
    }
}

void Application::putFPS()
{
    auto diff = std::chrono::system_clock::now() - m_lastTime;
    float fps = 1/ (std::chrono::duration_cast<std::chrono::milliseconds>(diff).count() / 1000.0f);
    m_lastTime = std::chrono::system_clock::now();
    glfwSetWindowTitle(m_windowHandler->getWindow(),("Scripter\t" + std::to_string(fps)).c_str());
}