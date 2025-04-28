// AI Assistant Functionality
class Chatbot {
    constructor() {
        this.initElements();
        this.setupEventListeners();
    }

    initElements() {
        this.toggleBtn = document.getElementById('chatbotToggle');
        this.container = document.getElementById('chatbotContainer');
        this.closeBtn = document.getElementById('closeChatbot');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.inputField = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('sendChatbotMessage');
    }

    setupEventListeners() {
        this.toggleBtn.addEventListener('click', () => this.toggleChatbot());
        this.closeBtn.addEventListener('click', () => this.hideChatbot());
        this.sendBtn.addEventListener('click', () => this.handleSendMessage());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSendMessage();
        });
    }

    toggleChatbot() {
        this.container.style.display = 
            this.container.style.display === 'block' ? 'none' : 'block';
    }

    hideChatbot() {
        this.container.style.display = 'none';
    }

    handleSendMessage() {
        const message = this.inputField.value.trim();
        if (message) {
            this.addMessage(message, 'user');
            this.inputField.value = '';
            this.generateResponse(message);
        }
    }

    addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        this.messagesContainer.appendChild(messageElement);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    generateResponse(userMessage) {
        // Simulate API call delay
        setTimeout(() => {
            let response;
            const lowerMsg = userMessage.toLowerCase();

            if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
                response = "I can tell you about Weldon's ML, Cloud, or Analytics projects. Which interests you?";
            } 
            else if (lowerMsg.includes('resume')) {
                response = "The resume includes Experience, Education, and Skills sections. Want details on any?";
            }
            else {
                response = "I'm Weldon's AI assistant. Ask about projects, resume, or how to contact him.";
            }

            this.addMessage(response, 'bot');
        }, 800);
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
// Dark Mode Toggle
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Check saved preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
