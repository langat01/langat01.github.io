// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    const launchButtons = document.querySelectorAll('#chatbot-launch');
    const closeButton = document.getElementById('chatbot-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    // Launch chatbot
    launchButtons.forEach(button => {
        button.addEventListener('click', function() {
            chatbotContainer.classList.add('visible');
        });
    });
    
    // Close chatbot
    closeButton.addEventListener('click', function() {
        chatbotContainer.classList.remove('visible');
    });
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user-message');
            chatInput.value = '';
            
            // Simulate thinking delay
            setTimeout(() => {
                const response = generateResponse(message);
                addMessage(response, 'bot-message');
            }, 800);
        }
    }
    
    // Handle Enter key or Send button
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
    
    chatSend.addEventListener('click', sendMessage);
    
    // Add message to chat
    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Generate bot response
    function generateResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        // Home page responses
        if (document.querySelector('h2').textContent.includes('Data Science Specialist')) {
            if (lowerMsg.includes('skill') || lowerMsg.includes('technology')) {
                return "Weldon specializes in Python, Machine Learning (Scikit-learn, TensorFlow), Data Analysis (Pandas, NumPy), and Cloud Technologies (AWS, GCP).";
            } else if (lowerMsg.includes('experience') || lowerMsg.includes('background')) {
                return "With 5+ years in data science, Weldon has worked on predictive modeling, ETL pipelines, and business intelligence solutions across multiple industries.";
            } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
                return "You can contact Weldon directly at your-email@example.com for professional inquiries.";
            }
        }
        
        // Projects page responses
        else if (document.querySelector('h2').textContent.includes('Projects')) {
            if (lowerMsg.includes('predictive') || lowerMsg.includes('maintenance')) {
                return "The Predictive Maintenance System uses sensor data with LSTM networks to forecast equipment failures 48 hours in advance, reducing downtime by 35%.";
            } else if (lowerMsg.includes('churn')) {
                return "The Customer Churn Analysis identified that contract length and support ticket frequency were key predictors, leading to a revised customer success strategy.";
            } else if (lowerMsg.includes('pipeline') || lowerMsg.includes('real-time')) {
                return "The Real-time Data Pipeline uses AWS Kinesis for ingestion, Lambda for processing, and Redshift for storage, handling 10K+ events/sec with <100ms latency.";
            }
        }
        
        // Default response
        return "I can answer questions about Weldon's technical skills, project experience, or professional background. Try asking something more specific!";
    }
});
