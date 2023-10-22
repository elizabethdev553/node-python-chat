const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const filePath = path.join(__dirname, 'chat.html');
        fs.readFile(filePath, (error, content) => {
            if (!error) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            }
        });
    }
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Handle incoming messages from the client
        fs.writeFileSync('latest_input.txt', message)
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                // Broadcast the message to all connected clients (except the sender)
                client.send(message);
            }
        });
    });
});

server.listen(3702, () => {
    console.log('Server is running on port 3702');
});