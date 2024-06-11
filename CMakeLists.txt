cmake_minimum_required(VERSION 3.10)

set(project Scripter)
project(${project})



include_directories(
                    ${CMAKE_SOURCE_DIR}/include
)

file(GLOB_RECURSE SOURCES
    ${CMAKE_SOURCE_DIR}/test/main.cpp
    ${CMAKE_SOURCE_DIR}/src/*.cpp
)

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Debug)
endif()

if(CMAKE_BUILD_TYPE MATCHES "Debug")
    add_compile_definitions(DEBUG)
endif()

add_executable(${project} ${SOURCES})
set_target_properties(${project} PROPERTIES CXX_STANDARD 17)