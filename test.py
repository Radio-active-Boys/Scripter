import socket

# Define the server address and port
server_address = '172.18.3.104'
server_port = 9002
buffer_size = 1024

def main():
    # Create a TCP/IP socket
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    # Connect to the server
    client_socket.connect((server_address, server_port))
    print(f"Connected to server at {server_address}:{server_port}")
    
    try:
        # Send data
        message = "Hello, Echo Server!"
        print(f"Sending: {message}")
        client_socket.sendall(message.encode('utf-8'))
        
        # Receive the response
        response = client_socket.recv(buffer_size)
        print(f"Received: {response.decode('utf-8')}")
    
    finally:
        # Close the connection
        print("Closing connection")
        client_socket.close()

if __name__ == "__main__":
    main()
