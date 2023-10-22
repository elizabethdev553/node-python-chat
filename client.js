const chatMessages = document.getElementById("chat-messages");
const userInputElement = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// WebSocket setup
const socket = new WebSocket("ws://localhost:3702");

// Add a message to the chat interface
function addMessageToChat(message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
}

// Handle messages received from the WebSocket server
socket.onmessage = (event) => {
    const message = event.data;
    addMessageToChat(`VAQEEL: ${message}`);
};

// Event listener for the "Send" button
sendButton.addEventListener("click", () => {
    const userMessage = userInputElement.value.trim();
    if (userMessage) {
        addMessageToChat(`You: ${userMessage}`);
        socket.send(userMessage); // Send user's message to the server
        userInputElement.value = ""; // Clear the input field
    }
});