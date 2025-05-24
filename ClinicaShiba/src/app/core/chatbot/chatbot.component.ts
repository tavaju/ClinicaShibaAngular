import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  private apiKey: string = '';
  messages: Message[] = [];
  newMessage: string = '';
  isLoading: boolean = false;
  isCollapsed: boolean = true; // Start with chatbot collapsed
  unreadMessages: number = 0; // Counter for unread messages
  environment = environment; // Make environment accessible in template
  
  // System prompt that will be sent with each user message
  private systemPrompt: string = "Identity You are the Customer Support AI Agent for Clínica Shiba. Your role is to interact with customers, address their inquiries, and provide assistance with basic information about the services offered and the location of the clinic. Clínica Shiba is a friendly veterinary clinic committed to providing the best care to its clients and their pets. Scope - Focus on customer inquiries about the types of veterinary services available and the address of the clinic. - Do not handle appointment scheduling, pricing, medical advice, or emergency assistance. - Redirect or escalate issues outside your expertise to a human agent. Responsibility - Initiate interactions with a warm, friendly greeting that explains your capabilities. - Guide the conversation by offering information on services and location. - Provide accurate and concise responses. - Escalate to a human agent when customer inquiries exceed your capabilities. Response Style - Maintain a cute, friendly, and user-friendly tone. - Use text-only responses, with occasional light emojis like 🐾 or 📍, but avoid excessive use. - Keep answers brief and clear, suitable for all types of users. Ability - You do not have the ability to delegate tasks or integrate with other tools. - You cannot access databases or perform automated actions. Guardrails - Privacy: Do not request any personal data. Maintain confidentiality and security. - Accuracy: Only provide verified responses based on your initial prompt (services and address). Do not speculate or guess. Instructions - Greeting: Start every conversation with a friendly welcome and clarification of your scope. Example: ¡Hola! 🐾 Bienvenido a Clínica Shiba, tu veterinaria amigable. Soy el asistente virtual y estoy aquí para contarte sobre nuestros servicios y cómo encontrarnos. ¿Qué deseas saber hoy? - Escalation: When a customer query becomes too complex or sensitive, notify the customer that you'll escalate the conversation to a human agent. Example: ¡Ups! Esa es una excelente pregunta, pero yo solo puedo ayudarte con información básica sobre nuestros servicios y la dirección. Para eso, te recomiendo contactar directamente con nuestro equipo humano 💬. - Closing: End interactions by confirming that the customer's issue has been addressed. Example: ¿Puedo ayudarte con algo más hoy? 🐶 Si no, ¡te deseamos un día lleno de patitas felices! 💛";
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    // Get API key from Angular environment
    this.apiKey = environment.gemini.apiKey;
    console.log('API Key loaded:', this.apiKey ? 'Successfully' : 'Failed');
    console.log('API Key length:', this.apiKey ? this.apiKey.length : 0);
    
    // Add a welcome message
    this.messages.push({
      content: 'Hola! Soy el asistente virtual de Clínica Shiba. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    });
  }
  
  testApiConnection() {
    this.isLoading = true;
    console.log('Testing API connection...');
    
    // Updated model to use newer gemini model that's still available
    const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent';
    const fullUrl = `${apiUrl}?key=${encodeURIComponent(this.apiKey)}`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const payload = {
      contents: [
        {
          role: "model",
          parts: [{ text: "Eres un asistente de prueba." }]
        },
        {
          role: "user",
          parts: [{ text: "Responde solamente con 'Conexión exitosa' si puedes recibir este mensaje." }]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 20
      }
    };
    
    console.log('Full URL being used:', apiUrl);
    console.log('API Key first/last chars:', 
                this.apiKey.substring(0, 4) + '...' + this.apiKey.substring(this.apiKey.length - 4));
    
    this.http.post(fullUrl, payload, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('Test API Response:', response);
          
          this.messages.push({
            content: '✅ Prueba de API exitosa. La conexión está funcionando correctamente.',
            sender: 'bot',
            timestamp: new Date()
          });
          
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Test API Error:', error);
          
          let errorDetails = '';
          if (error.status) {
            errorDetails = ` (Status: ${error.status})`;
            
            if (error.status === 403) {
              errorDetails += ' - Posible problema con la API key o permisos.';
            } else if (error.status === 401) {
              errorDetails += ' - API key inválida o no autorizada.';
            } else if (error.status === 404) {
              errorDetails += ' - URL incorrecta o recurso no encontrado.';
            }
          }
          
          this.messages.push({
            content: `❌ Error de conexión a la API${errorDetails}. Revisa la consola para más detalles.`,
            sender: 'bot',
            timestamp: new Date()
          });
          
          this.isLoading = false;
        }
      });
  }
  
  sendMessage() {
    if (!this.newMessage.trim()) return;
    
    // Add user message to chat
    this.messages.push({
      content: this.newMessage,
      sender: 'user',
      timestamp: new Date()
    });
    
    // Store the message and clear input
    const userMessage = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;
    
    console.log('Sending message to Gemini API:', userMessage);
    
    // Call Gemini API
    this.getGeminiResponse(userMessage);
  }
  
  getGeminiResponse(userMessage: string) {
    // Updated model to use newer gemini model that's still available
    const apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent';
    const fullUrl = `${apiUrl}?key=${encodeURIComponent(this.apiKey)}`;
    
    console.log('Using API URL:', apiUrl);
    console.log('API Key first/last chars:', 
                this.apiKey.substring(0, 4) + '...' + this.apiKey.substring(this.apiKey.length - 4));
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const payload = {
      contents: [
        {
          role: "model",
          parts: [{ text: this.systemPrompt }]
        },
        {
          role: "user",
          parts: [{ text: userMessage }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    };
    
    console.log('Request payload:', JSON.stringify(payload));
    
    this.http.post(fullUrl, payload, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('API Response:', response);
          
          if (response && response.candidates && response.candidates.length > 0 && 
              response.candidates[0].content && response.candidates[0].content.parts && 
              response.candidates[0].content.parts.length > 0) {
            
            const botResponse = response.candidates[0].content.parts[0].text;
            console.log('Bot response:', botResponse);
            
            this.messages.push({
              content: botResponse,
              sender: 'bot',
              timestamp: new Date()
            });
            
            // Increment unread messages counter if chatbot is collapsed
            if (this.isCollapsed) {
              this.unreadMessages++;
            }
          } else {
            console.error('Invalid response structure:', response);
            this.messages.push({
              content: 'Lo siento, recibí una respuesta incorrecta del servidor. Por favor, intenta más tarde.',
              sender: 'bot',
              timestamp: new Date()
            });
            
            // Increment unread messages counter if chatbot is collapsed
            if (this.isCollapsed) {
              this.unreadMessages++;
            }
          }
          
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error calling Gemini API:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          
          if (error.error) {
            console.error('Error details:', error.error);
          }
          
          let errorMessage = 'Lo siento, ha ocurrido un error. Por favor, intenta más tarde.';
          
          if (error.status === 400) {
            errorMessage = 'Error en la solicitud. Verifique el formato del mensaje.';
          } else if (error.status === 401 || error.status === 403) {
            errorMessage = 'Error de autenticación o autorización. Posible problema con la API key.';
          } else if (error.status === 429) {
            errorMessage = 'Demasiadas solicitudes. Por favor, intenta más tarde.';
          } else if (error.status >= 500) {
            errorMessage = 'Error en el servidor de Gemini. Por favor, intenta más tarde.';
          }
          
          this.messages.push({
            content: errorMessage,
            sender: 'bot',
            timestamp: new Date()
          });
          
          // Increment unread messages counter if chatbot is collapsed
          if (this.isCollapsed) {
            this.unreadMessages++;
          }
          
          this.isLoading = false;
        }
      });
  }
  
  /**
   * Updates the system prompt that is sent with each user message
   * @param newPrompt The new system prompt to use
   */
  updateSystemPrompt(newPrompt: string) {
    if (newPrompt && newPrompt.trim()) {
      this.systemPrompt = newPrompt.trim();
      console.log('System prompt updated to:', this.systemPrompt);
      return true;
    }
    return false;
  }
  
  /**
   * Gets the current system prompt
   * @returns The current system prompt
   */
  getSystemPrompt(): string {
    return this.systemPrompt;
  }
  
  /**
   * Toggles the collapsed state of the chatbot
   */
  toggleChatbot() {
    this.isCollapsed = !this.isCollapsed;
    
    // Reset unread messages counter when opening the chatbot
    if (!this.isCollapsed) {
      this.unreadMessages = 0;
    }
  }
}
