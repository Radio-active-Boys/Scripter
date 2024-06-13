#include "ws_server.h"

int main()
{
    Server server;
    server.run(9002);
    return 0;
}











// #ifndef _WEBSOCKETPP_CPP11_THREAD
// #define _WEBSOCKETPP_CPP11_THREAD
// #endif
// #ifndef _WEBSOCKETPP_CPP11_TYPE_TRAITS_
// #define _WEBSOCKETPP_CPP11_TYPE_TRAITS_
// #endif
// #ifndef ASIO_STANDALONE
// #define ASIO_STANDALONE
// #endif

// #include <websocketpp/server.hpp>
// #include <websocketpp/config/asio_no_tls.hpp>
// #include <iostream>
// #include <set>
// #include <thread> // For std::this_thread
// #include <chrono> // For std::chrono
// #include <mutex>  // For std::mutex

// typedef websocketpp::server<websocketpp::config::asio> server;


// // Define the WebSocket server
// server echo_server;

// // Mutex for thread-safe access to the connection list
// std::mutex connection_list_mutex;

// // List of connection handles
// std::set<websocketpp::connection_hdl, std::owner_less<websocketpp::connection_hdl>> connections;

// // Function to handle incoming WebSocket messages
// void on_message(websocketpp::connection_hdl hdl, server::message_ptr msg) {
//     std::string message = msg->get_payload(); // Get the message payload

//     // Print the received message to the console
//     std::cout << "Received message: " << message << std::endl;

//     try {
//         // Echo the received message back to the client
//         echo_server.send(hdl, message, msg->get_opcode());
//     } catch (const websocketpp::lib::error_code& ec) {
//         std::cout << "Echo failed because: " << ec.message() << std::endl;
//     }
// }

// // Function to handle new connections
// void on_open(websocketpp::connection_hdl hdl) {
//     std::lock_guard<std::mutex> guard(connection_list_mutex);
//     connections.insert(hdl);
// }

// // Function to handle closed connections
// void on_close(websocketpp::connection_hdl hdl) {
//     std::lock_guard<std::mutex> guard(connection_list_mutex);
//     connections.erase(hdl);
// }

// // Function to send a message to all connected clients
// void send_message_to_all_clients(const std::string& message) {
//     std::lock_guard<std::mutex> guard(connection_list_mutex);
//     for (auto it : connections) {
//         try {
//             echo_server.send(it, message, websocketpp::frame::opcode::text);
//         } catch (const websocketpp::lib::error_code& ec) {
//             std::cout << "Failed to send message: " << ec.message() << std::endl;
//         }
//     }
// }


// int main() {
//     try {
//         // Set logging settings
//         echo_server.set_access_channels(websocketpp::log::alevel::all);
//         echo_server.clear_access_channels(websocketpp::log::alevel::frame_payload);

//         // Initialize ASIO
//         echo_server.init_asio();

//         // Register our message handler
//         echo_server.set_message_handler(&on_message);
        
//         // Register open and close handlers
//         echo_server.set_open_handler(&on_open);
//         echo_server.set_close_handler(&on_close);

//         // Listen on port 9002
//         echo_server.listen(9002);

//         // Start the server accept loop
//         echo_server.start_accept();

//         // Start the ASIO io_service run loop in a separate thread
//         std::thread server_thread([]() {
//             try {
//                 echo_server.run();
//             } catch (const std::exception& e) {
//                 std::cerr << "Exception in server thread: " << e.what() << std::endl;
//             }
//         });

//         // Start a thread for periodic message sending

//         // Join threads to wait for them to finish (not necessary in all setups)
//         server_thread.join();

//     } catch (const websocketpp::exception& e) {
//         std::cerr << "Exception: " << e.what() << std::endl;
//     } catch (const std::exception& e) {
//         std::cerr << "Some exception: " << e.what() << std::endl;
//     } catch (...) {
//         std::cerr << "Unknown exception" << std::endl;
//     }

//     return 0;
// }
