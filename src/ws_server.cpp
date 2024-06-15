#include "ws_server.h"

void Server::on_message(websocketpp::connection_hdl hdl, ws_server::message_ptr msg)
{
    std::string message = msg->get_payload(); // Get the message payload

    // Print the received message to the console
    std::cout << "Received message: "<< message << std::endl;


    Request::handle_request(message,hdl,&m_connection_list_mutex, &m_server);

    try {
        // Echo the received message back to the client
        m_server.send(hdl, message, msg->get_opcode());
    } catch (const websocketpp::lib::error_code& ec) {
        std::cout << "Echo failed because: " << ec.message() << std::endl;
    }
}

void Server::on_close(websocketpp::connection_hdl hdl)
{
    std::lock_guard<std::mutex> guard(m_connection_list_mutex);
    m_connections.erase(hdl);
}

void Server::send_message(websocketpp::connection_hdl hdl,const std::string& message)
{
    std::lock_guard<std::mutex> guard(m_connection_list_mutex);
    for (auto it : m_connections) {
        try {
           m_server.send(it, message, websocketpp::frame::opcode::text);
        } catch (const websocketpp::lib::error_code& ec) {
            std::cout << "Failed to send message: " << ec.message() << std::endl;
        }
    }
}

void Server::on_open(websocketpp::connection_hdl hdl)
{
    std::lock_guard<std::mutex> guard(m_connection_list_mutex);
    m_connections.insert(hdl);
}

void Server::run(unsigned int PORT)
{
    try {
        // Set logging settings
        m_server.set_access_channels(websocketpp::log::alevel::all);
        m_server.clear_access_channels(websocketpp::log::alevel::frame_payload);

        // Initialize ASIO
        m_server.init_asio();

        // Register our message handler

        m_server.set_message_handler([this](websocketpp::connection_hdl hdl, ws_server::message_ptr msg) {
            this->on_message(hdl, msg);
        });

        // Register open handler
        m_server.set_open_handler([this](websocketpp::connection_hdl hdl) {
            this->on_open(hdl);
        });

        // Register close handler
        m_server.set_close_handler([this](websocketpp::connection_hdl hdl) {
            this->on_close(hdl);
        });
        // Listen on port 9002
        m_server.listen(PORT);

        // Start the server accept loop
        m_server.start_accept();

        // Start the ASIO io_service run loop in a separate thread
        std::thread server_thread([this]() {
            try {
                this->m_server.run();
            } catch (const std::exception& e) {
                std::cerr << "Exception in server thread: " << e.what() << std::endl;
            }
        });

        // Start a thread for periodic message sending

        // Join threads to wait for them to finish (not necessary in all setups)
        server_thread.join();

    } catch (const websocketpp::exception& e) {
        std::cerr << "Exception: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Some exception: " << e.what() << std::endl;
    } catch (...) {
        std::cerr << "Unknown exception" << std::endl;
    }
}