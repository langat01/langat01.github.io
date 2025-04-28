// AI Assistant Functionality
document.addEventListener('DOMContentLoaded', function() {
    const aiBtn = document.getElementById('aiAssistantBtn');
    const chatWindow = document.getElementById('aiChatWindow');
    const closeBtn = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendMessage');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle chat window
    aiBtn.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                const response = generateAIResponse(message);
                addMessage(response, 'ai');
            }, 500);
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollTop + 100;
    }

    // Generate AI responses
    function generateAIResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
            return "I can tell you about Weldon's projects in Data Science, Machine Learning, or Cloud Technologies. Which area interests you?";
        }
        else if (lowerMsg.includes('resume') || lowerMsg.includes('experience')) {
            return "Weldon's resume includes Experience, Education, and Skills sections. Would you like details on any specific area?";
        }
        else if (lowerMsg.includes('contact')) {
            return "You can contact Weldon via email at weldon@example.com or through the contact form on this website.";
        }
        else {
            return "I'm Weldon's AI assistant. I can help you navigate his portfolio, resume, or contact information. What would you like to know?";
        }
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
