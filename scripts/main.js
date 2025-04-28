function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') sendMessage();
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';
        
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 500);
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender + '-message');
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! How can I assist you with your data science questions?";
    } else if (lowerMessage.includes('email') || lowerMessage.includes('contact')) {
        return "You can reach Weldon at weldon.langat@example.com or +1 (555) 123-4567";
    } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
        return "You can download Weldon's resume from the link on the homepage.";
    } else if (lowerMessage.includes('github')) {
        return "Check out Weldon's GitHub profile: https://github.com/weldonlangat";
    } else if (lowerMessage.includes('linkedin')) {
        return "Connect with Weldon on LinkedIn: https://linkedin.com/in/weldonlangat";
    } else if (lowerMessage.includes('python')) {
        return "Python is a powerful language for data science with libraries like Pandas, NumPy, and Scikit-learn.";
    } else if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
        return "Machine learning involves training algorithms to make predictions or decisions without explicit programming.";
    } else if (lowerMessage.includes('predictive') || lowerMessage.includes('maintenance')) {
        return "The Predictive Maintenance System uses sensor data to forecast equipment failures with 92% accuracy.";
    } else if (lowerMessage.includes('customer') || lowerMessage.includes('segmentation')) {
        return "Customer Segmentation clusters users into 5 distinct groups based on purchasing behavior.";
    } else if (lowerMessage.includes('sentiment') || lowerMessage.includes('analysis')) {
        return "The Sentiment Analysis Tool processes 10,000+ reviews/minute with 87% sentiment accuracy.";
    } else if (lowerMessage.includes('sales') || lowerMessage.includes('forecast')) {
        return "Sales Forecasting reduced inventory costs by 18% through better demand prediction.";
    } else {
        return "I'm a simple AI assistant focused on data science. Could you clarify your question?";
    }
}

// Add event listener for Enter key
document.getElementById('user-input').addEventListener('keypress', handleKeyPress);
