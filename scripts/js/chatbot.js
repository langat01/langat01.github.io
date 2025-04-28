document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendChatbotMessage = document.getElementById('sendChatbotMessage');
    
    // Knowledge base
    const knowledgeBase = {
        projects: {
            'machine learning': [
                "Here are Weldon's Machine Learning projects:",
                "1. Predictive Maintenance System (92% accuracy)",
                "2. Customer Churn Prediction (89% precision)",
                "3. Fraud Detection Algorithm"
            ],
            'cloud': [
                "Here are Weldon's Cloud projects:",
                "1. AWS Data Pipeline (1M+ records daily)",
                "2. Google Cloud AutoML Implementation",
                "3. Azure IoT Analytics Platform"
            ]
        },
        resume: {
            'experience': [
                "Weldon's Experience:",
                "1. Senior Data Scientist at TechCo (2020-Present)",
                "2. Data Engineer at Analytics Corp (2017-2020)"
            ],
            'education': [
                "Weldon's Education:",
                "1. MSc Data Science, University of Tech",
                "2. BSc Computer Science, Nairobi University"
            ]
        },
        contact: [
            "Contact Information:",
            "Email: weldon@example.com",
            "Phone: +1 (555) 123-4567",
            "Location: Nairobi, Kenya"
        ],
        default: [
            "I'm Weldon's AI assistant. I can help with:",
            "- Project information (ML/Cloud)",
            "- Resume details",
            "- Contact methods",
            "Try asking: 'Tell me about machine learning projects'"
        ]
    };
    
    // Toggle chatbot
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close chatbot
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.style.display = 'none';
    });
    
    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user-message');
            chatbotInput.value = '';
            
            setTimeout(() => {
                const response = generateResponse(message);
                addMessage(response, 'bot-message');
            }, 600);
        }
    }
    
    // Add message to chat
    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Generate response
    function generateResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('project')) {
            if (lowerMsg.includes('machine learning') || lowerMsg.includes('ml')) {
                return knowledgeBase.projects['machine learning'].join('\n');
            } else if (lowerMsg.includes('cloud')) {
                return knowledgeBase.projects['cloud'].join('\n');
            } else {
                return "Which projects interest you? Options:\n- Machine Learning\n- Cloud";
            }
        } else if (lowerMsg.includes('resume')) {
            if (lowerMsg.includes('experience') || lowerMsg.includes('work')) {
                return knowledgeBase.resume['experience'].join('\n');
            } else if (lowerMsg.includes('education') || lowerMsg.includes('degree')) {
                return knowledgeBase.resume['education'].join('\n');
            } else {
                return "Which resume section would you like?\n- Experience\n- Education";
            }
        } else if (lowerMsg.includes('contact')) {
            return knowledgeBase.contact.join('\n');
        } else {
            return knowledgeBase.default.join('\n');
        }
    }
    
    // Event listeners
    sendChatbotMessage.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
});
