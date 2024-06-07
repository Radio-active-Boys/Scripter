#pragma once
#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include <iostream>

class WindowHandler
{
public:
    WindowHandler(const char* window_name);
    friend void framebufferSizeCallback(GLFWwindow* window, int width, int height);
    void processInput(void) const;
    GLFWwindow* getWindow() const;
    bool closeWindow()const;
    ~WindowHandler();
private:
    GLFWwindow* m_window = nullptr;
};

void framebufferSizeCallback(GLFWwindow* window, int width, int height);