// Chatbot functionality
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotClose = document.querySelector('.chatbot-close');
const chatbotSend = document.querySelector('.chatbot-send');
const chatbotInput = document.querySelector('.chatbot-input input');
const chatbotMessages = document.querySelector('.chatbot-messages');

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Chatbot responses
const botResponses = [
    "I can help you with: \n1. Project details \n2. Contact info \n3. Technical skills",
    "My creator specializes in Python, Machine Learning, and Data Analysis",
    "You can contact Weldon via email at weldon@example.com",
    "The portfolio projects showcase real-world data science applications",
    "Would you like me to direct you to a specific section of the website?"
];

// Send message function
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Bot response (after delay)
        setTimeout(() => {
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            addMessage(randomResponse, 'bot');
        }, 1000);
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chatbot-message', sender);
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will respond soon.');
    this.reset();
});
