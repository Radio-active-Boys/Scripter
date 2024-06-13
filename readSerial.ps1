$port = "COM6"  # Replace with your actual serial port, e.g., COM3
$baud = 9600    # Replace with your baud rate, e.g., 9600

$serialPort = New-Object System.IO.Ports.SerialPort
$serialPort.PortName = $port
$serialPort.BaudRate = $baud
$serialPort.Open()

while ($true) {
    if ($serialPort.BytesToRead -gt 0) {
        $data = $serialPort.ReadLine()
        Write-Host "Received: $data"
    }
}

$serialPort.Close()
