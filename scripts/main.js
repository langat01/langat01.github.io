// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Active nav link highlighting
const currentPage = location.pathname.split('/').pop();
document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Chatbot functionality
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const inputInitHeight = chatInput?.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    
    // Simple responses - in a real app you'd use an API
    const responses = {
        "hello": "Hi there! How can I help you today?",
        "hi": "Hello! What would you like to know about Weldon's work?",
        "projects": "Weldon has worked on several data science projects including predictive analytics models and data visualization dashboards.",
        "contact": "You can reach Weldon at weldon.langat@example.com or through the contact form on this website.",
        "resume": "Weldon has a MSc in Data Science from Stanford University and experience as a Senior Data Scientist. You can view his full resume on the resume page."
    };
    
    const defaultResponse = "I'm Weldon's AI assistant. I can tell you about his projects, experience, or how to contact him. What would you like to know?";
    
    const lowerMessage = userMessage.toLowerCase();
    let response = defaultResponse;
    
    for (const [key, value] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            response = value;
            break;
        }
    }
    
    setTimeout(() => {
        messageElement.textContent = response;
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 1000);
}

// Event listeners for chatbot
if (chatbotToggler) {
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
}
if (closeBtn) {
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
}
if (sendChatBtn) {
    sendChatBtn.addEventListener("click", handleChat);
}
if (chatInput) {
    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });
    chatInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });
}
