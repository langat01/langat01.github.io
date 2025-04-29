document.addEventListener('DOMContentLoaded', function() {
    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotWidget.classList.toggle('active');
    });

    chatbotClose.addEventListener('click', function() {
        chatbotWidget.classList.remove('active');
    });

    // Chatbot responses
    const responses = {
        "hello": "Hello there! How can I help you today?",
        "hi": "Hi! I'm Weldon's AI assistant. What would you like to know?",
        "projects": "You can view Weldon's projects in the Projects section. They include data science, machine learning, and cloud computing projects.",
        "certifications": "Weldon has several professional certifications listed in the Certifications section, including from IBM, Stanford, and AWS.",
        "contact": "You can reach Weldon through the Contact section or connect with him on LinkedIn and GitHub using the links above.",
        "resume": "Weldon's professional experience and skills are detailed in the Resume section.",
        "skills": "Weldon specializes in Python, Machine Learning, Data Analysis, and Cloud Technologies.",
        "default": "I'm sorry, I didn't understand that. You can ask about Weldon's projects, certifications, skills, or how to contact him."
    };

    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Handle sending messages
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatbotInput.value = '';
            
            // Simulate thinking delay
            setTimeout(() => {
                const lowerMessage = message.toLowerCase();
                let response = responses.default;
                
                for (const key in responses) {
                    if (lowerMessage.includes(key)) {
                        response = responses[key];
                        break;
                    }
                }
                
                addMessage(response);
            }, 800);
        }
    }

    // Send message on button click or Enter key
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const nav = document.querySelector('nav');
                    nav.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle (would need additional HTML/CSS)
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileMenuToggle);

    mobileMenuToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav');
        nav.classList.toggle('active');
    });

    // View certificate buttons
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function() {
            // In a real implementation, this would open a modal or link to the certificate
            alert('In a complete implementation, this would show the certificate details or verification page.');
        });
    });

    // Add initial bot message
    addMessage("Hello! I'm Weldon's AI assistant. How can I help you today?");
});
