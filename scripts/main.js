<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chatbot | Weldon Langat</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: linear-gradient(to right, #4b0082, #800080);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      color: white;
    }
    .chat-container {
      background: rgba(255, 255, 255, 0.1);
      width: 350px;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    }
    .chat-header {
      background: #00ff88;
      color: #4b0082;
      padding: 1rem;
      font-weight: bold;
      text-align: center;
    }
    .chat-messages {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      height: 300px;
      font-size: 0.95rem;
    }
    .chat-input {
      display: flex;
      border-top: 1px solid #ccc;
    }
    .chat-input input {
      flex: 1;
      padding: 0.75rem;
      border: none;
      font-size: 1rem;
      border-radius: 0;
    }
    .chat-input button {
      padding: 0.75rem 1rem;
      border: none;
      background-color: #00ff88;
      color: #4b0082;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="chat-container">
    <div class="chat-header">💬 Ask Weldon Bot</div>
    <div class="chat-messages" id="chat-box">
      <div><strong>Bot:</strong> Hello! How can I assist you today?</div>
    </div>
    <div class="chat-input">
      <input type="text" id="userInput" placeholder="Type a message..." />
      <button onclick="sendMessage()">Send</button>
    </div>
  </div>

  <script>
    function sendMessage() {
      const input = document.getElementById("userInput");
      const message = input.value.trim();
      const chatBox = document.getElementById("chat-box");
      if (message !== "") {
        chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

        // Dummy response for simulation
        let reply = "I'm here to help you with anything about Weldon's work.";
        if (message.toLowerCase().includes("project")) {
          reply = "You can explore my recent data science projects on the Projects page.";
        } else if (message.toLowerCase().includes("contact")) {
          reply = "Please use the Contact page to reach out to me directly.";
        } else if (message.toLowerCase().includes("certificate")) {
          reply = "My certificates are listed under the Certificates section.";
        }

        setTimeout(() => {
          chatBox.innerHTML += `<div><strong>Bot:</strong> ${reply}</div>`;
          chatBox.scrollTop = chatBox.scrollHeight;
        }, 600);

        input.value = "";
      }
    }
  </script>
</body>
</html>

