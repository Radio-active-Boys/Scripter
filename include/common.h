#ifndef COMMON_H
#define COMMON_H
#ifndef _WEBSOCKETPP_CPP11_THREAD
#define _WEBSOCKETPP_CPP11_THREAD
#endif
#ifndef _WEBSOCKETPP_CPP11_TYPE_TRAITS_
#define _WEBSOCKETPP_CPP11_TYPE_TRAITS_
#endif
#ifndef ASIO_STANDALONE
#define ASIO_STANDALONE
#endif

#include <websocketpp/server.hpp>
#include <websocketpp/config/asio_no_tls.hpp>
#include <iostream>
#include <set>
#include <thread> // For std::this_thread
#include <chrono> // For std::chrono
#include <mutex>  // For std::mutex
#include <windows.h>
#include <string>
#include <fstream>
#include "rapidjson/document.h"
typedef websocketpp::server<websocketpp::config::asio> ws_server;
#endif