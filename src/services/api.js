/* export class ApiService {
    constructor() {
      this.apiKey = process.env.REACT_APP_API_KEY;
      this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    }
  
    async sendMessage(messages) {
      try {
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [
              {
                role: "system",
                content: "You are a therapeutic assistant trained to provide supportive responses based on established therapeutic techniques. Your responses should be empathetic, non-judgmental, and aimed at helping the patient explore their thoughts and feelings. Never provide medical advice or diagnosis."
              },
              ...messages
            ],
            temperature: 0.7,
            max_tokens: 150
          })
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'API request failed');
        }
  
        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        console.error('API Service Error:', error);
        throw error;
      }
    }
  }
  
  export const apiService = new ApiService(); */