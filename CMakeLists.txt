cmake_minimum_required(VERSION 3.10)

set(project Scripter)
project(${project})

add_subdirectory(
    ${CMAKE_SOURCE_DIR}/vendors/websocketpp
    ${CMAKE_SOURCE_DIR}/vendors/rapidjson
)

include_directories(
                    ${CMAKE_SOURCE_DIR}/include
                    ${CMAKE_SOURCE_DIR}/vendors/websocketpp
                    ${CMAKE_SOURCE_DIR}/vendors/asio/asio/include
                    ${CMAKE_SOURCE_DIR}/vendors/rapidjson/include
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

add_compile_definitions(ASIO_STANDALONE)
add_compile_definitions(_WEBSOCKETPP_CPP11_THREAD)
add_compile_definitions(_WEBSOCKETPP_CPP11_TYPE_TRAITS_)

add_executable(${project} ${SOURCES})
set_target_properties(${project} PROPERTIES CXX_STANDARD 20)