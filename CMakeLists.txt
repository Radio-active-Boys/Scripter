cmake_minimum_required(VERSION 3.10)

set(project Scripter)
project(${project})

add_subdirectory(${CMAKE_SOURCE_DIR}/vendor/glfw)

include_directories(
                    ${CMAKE_SOURCE_DIR}/include
                    ${CMAKE_SOURCE_DIR}/vendor/imgui
                    ${CMAKE_SOURCE_DIR}/vendor/
)

file(GLOB_RECURSE SOURCES
    ${CMAKE_SOURCE_DIR}/test/main.cpp
    ${CMAKE_SOURCE_DIR}/src/*.cpp
    ${CMAKE_SOURCE_DIR}/vendor/glad/*.c
    ${CMAKE_SOURCE_DIR}/vendor/imgui/*.cpp
)

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Debug)
endif()

if(CMAKE_BUILD_TYPE MATCHES "Debug")
    add_compile_definitions(DEBUG)
endif()

add_executable(${project} ${SOURCES})
target_link_libraries(${project} PRIVATE glfw opengl32.lib)
set_target_properties(${project} PROPERTIES CXX_STANDARD 17)