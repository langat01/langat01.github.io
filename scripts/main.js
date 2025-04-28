// Expanded response database
const knowledgeBase = {
    projects: {
        'machine learning': [
            "Weldon has built several ML models including:",
            "- Predictive Maintenance System (92% accuracy)",
            "- Customer Churn Predictor (89% precision)",
            "- Fraud Detection Algorithm"
        ],
        'cloud': [
            "Cloud projects include:",
            "- AWS Data Pipeline processing 1M+ records daily",
            "- Google Cloud AutoML implementation",
            "- Azure IoT Analytics Platform"
        ]
    },
    resume: {
        'experience': [
            "Professional Experience:",
            "1. Senior Data Scientist at TechCo (2020-Present)",
            "2. Data Engineer at Analytics Corp (2017-2020)"
        ],
        'education': [
            "Education Background:",
            "- MSc Data Science, University of Tech",
            "- BSc Computer Science, Nairobi University"
        ]
    },
    contact: [
        "Contact Options:",
        "📧 Email: weldon@example.com",
        "📞 Phone: +1 (555) 123-4567",
        "📍 Location: Nairobi, Kenya"
    ],
    default: [
        "I'm Weldon's AI assistant. I can help with:",
        "- Project details (ML/Cloud/Analytics)",
        "- Resume information",
        "- Contact methods",
        "Try asking: 'Tell me about machine learning projects'"
    ]
};

// Enhanced generateResponse method
generateResponse(userMessage) {
    setTimeout(() => {
        let response;
        const lowerMsg = userMessage.toLowerCase();
        
        if (lowerMsg.includes('project')) {
            if (lowerMsg.includes('machine learning') || lowerMsg.includes('ml')) {
                response = knowledgeBase.projects['machine learning'].join('\n');
            } 
            else if (lowerMsg.includes('cloud')) {
                response = knowledgeBase.projects['cloud'].join('\n');
            }
            else {
                response = "Which projects interest you? Options:\n- Machine Learning\n- Cloud\n- Data Analytics";
            }
        }
        else if (lowerMsg.includes('resume')) {
            if (lowerMsg.includes('experience') || lowerMsg.includes('work')) {
                response = knowledgeBase.resume.experience.join('\n');
            }
            else if (lowerMsg.includes('education') || lowerMsg.includes('degree')) {
                response = knowledgeBase.resume.education.join('\n');
            }
            else {
                response = "Which resume section?\n- Experience\n- Education\n- Skills";
            }
        }
        else if (lowerMsg.includes('contact')) {
            response = knowledgeBase.contact.join('\n');
        }
        else {
            response = knowledgeBase.default.join('\n');
        }

        this.addMessage(response, 'bot');
    }, 600);
}
