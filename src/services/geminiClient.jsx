import { GoogleGenerativeAI } from '@google/generative-ai';

// Real Gemini API implementation
let genAI = null;

// Initialize Gemini AI with API key
const initializeGemini = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn('Gemini API key not configured. Using fallback responses.');
    return null;
  }
  
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    return genAI;
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error);
    return null;
  }
};

// Fallback responses when API is not available
const fallbackResponses = [
  "I'm here to help with your metabolic wellness journey! To get personalized AI responses, please configure your Gemini API key in the .env file.",
  "For better metabolic health, try to include more whole grains and reduce processed foods in your meals.",
  "Regular sleep schedule is crucial for metabolic wellness. Aim for 7-8 hours of quality sleep each night.",
  "Consider consulting with a healthcare provider about your symptoms for personalized medical advice.",
  "For Indian meals, try replacing white rice with brown rice or quinoa for better blood sugar control.",
  "Include more seasonal vegetables and legumes in your diet for optimal nutrition and metabolic health.",
  "Regular monitoring of your vitals helps track progress. Keep logging your daily activities and meals."
];

// Fallback streaming simulation
class FallbackStream {
  constructor(response) {
    this.response = response;
    this.chunks = this.response.split(' ');
  }

  async *stream() {
    for (let i = 0; i < this.chunks.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
      const chunk = this.chunks[i] + (i < this.chunks.length - 1 ? ' ' : '');
      yield {
        candidates: [{
          content: {
            parts: [{ text: chunk }]
          }
        }]
      };
    }
  }
}

// Chat model implementation
class ChatModel {
  constructor(modelName = "gemini-1.5-flash") {
    this.modelName = modelName;
    this.genAI = initializeGemini();
    this.model = this.genAI ? this.genAI.getGenerativeModel({ model: modelName }) : null;
  }

  async generateContentStream({ contents, signal }) {
    // Check if request was aborted
    if (signal?.aborted) {
      throw new Error('AbortError');
    }

    // Use real Gemini API if available
    if (this.model && this.genAI) {
      try {
        const result = await this.model.generateContentStream({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        });
        return result;
      } catch (error) {
        console.error('Gemini API error:', error);
        // Fall back to mock response on API error
      }
    }
    
    // Fallback to simulated responses
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
    
    const userInput = contents[0]?.parts?.find(part => part.text?.includes('USER:'))?.text || '';
    let response;
    
    // Simple keyword-based response selection
    if (userInput.toLowerCase().includes('exercise') || userInput.toLowerCase().includes('workout')) {
      response = "For metabolic health, I recommend 150 minutes of moderate exercise weekly. Start with brisk walking, then gradually add strength training twice a week.";
    } else if (userInput.toLowerCase().includes('diet') || userInput.toLowerCase().includes('food') || userInput.toLowerCase().includes('meal')) {
      response = "Focus on a balanced diet with whole grains, lean proteins, and plenty of vegetables. For Indian cuisine, try dal with brown rice, grilled vegetables, and seasonal fruits.";
    } else if (userInput.toLowerCase().includes('sleep')) {
      response = "Quality sleep is crucial for metabolic health. Aim for 7-8 hours nightly, maintain a consistent schedule, and avoid screens before bedtime.";
    } else if (userInput.toLowerCase().includes('stress')) {
      response = "Chronic stress affects metabolism. Try meditation, deep breathing, or yoga. Even 10 minutes daily can make a significant difference.";
    } else {
      response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
    
    return new FallbackStream(response);
  }
}

export const getApiKey = () => {
  return import.meta.env.VITE_GEMINI_API_KEY;
};

export const getGenAI = () => {
  return initializeGemini();
};

export const createChatModel = (modelName = "gemini-1.5-flash") => {
  return new ChatModel(modelName);
};

export const systemPrompt = `You are Niyantrana, a calm, supportive metabolic wellness companion for Indian users.
Tone: clear, empathetic, empowering. Keep responses concise and actionable.
Capabilities:
- Answer questions about metabolic health (fatty liver, type-2 diabetes, hypertension)
- Provide simple, actionable tips and daily nudges
- Understand and log meals/activities/vitals from natural language
- Offer Indian meal guidance and healthy swaps
Never provide medical diagnosis. Encourage professional consultation when needed.`;