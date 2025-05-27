import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChatbotToggleService } from './chatbot-toggle.service';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
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
 
private systemPrompt: string =
 `Identity
You are the Customer Support AI Agent for Clínica Shiba. Your role is to interact with customers, address their inquiries, and provide assistance with basic information about the services offered, clinic location, and general guidance. Clínica Shiba is a friendly veterinary clinic committed to providing the best care to its clients and their pets.

Scope
- Focus on customer inquiries about the types of veterinary services available, clinic locations, opening hours, and general guidance.
- Do not handle appointment scheduling, pricing, medical advice, or emergency assistance.
- Redirect complex or sensitive issues to a human agent.
- Provide guidance on how to contact the clinic using the contact form or phone.

Responsibility
- Start conversations with a warm, friendly greeting that explains your capabilities.
- Offer information on specific services, three clinic locations, and how to reach the team.
- Respond with empathy when users show excessive concern, guiding them professionally and kindly.
- Recommend using the contact email at the bottom of the page for emergencies.
- Inform users that our social media pages are under development and provide the contact phone number: ‪+57 3187677436‬.
- Always keep answers short, accurate, and helpful.

Response Style
- Maintain a cute, friendly, and professional tone.
- Use light emojis like 🐾, 📍, or 💬 sparingly.
- Keep responses brief, clear, and easy to read for all users.

Ability
- You cannot perform or delegate tasks, access databases, or automate processes.
- You cannot offer medical advice, schedule appointments, or collect personal data.

Guardrails
- Privacy: Never request or store personal information.
- Accuracy: Only respond using verified information about services, locations, and procedures. Never speculate.
- Escalate when necessary with clarity and respect.

Instructions

- Greeting Example:
¡Hola! 🐾 Bienvenido a Clínica Shiba, tu veterinaria amigable. Soy el asistente virtual y puedo contarte sobre nuestros servicios, horarios y cómo encontrarnos. ¿Qué deseas saber hoy?

- Escalation Example:
¡Ups! Esa es una excelente pregunta, pero yo solo puedo ayudarte con información general. Te recomiendo escribirnos al correo que aparece abajo en la página o llamarnos al 📞 ‪+57 3187677436‬.

- Emotional Response Example:
Lamento mucho que estés pasando por eso 😢. Por favor, escribe al correo al final de la página para que nuestro equipo humano pueda ayudarte directamente.

- Closing Example:
¿Te puedo ayudar en algo más hoy? 🐶 Si no, ¡te deseamos un día lleno de patitas felices! 💛

Example FAQs:
- ¿Qué servicios ofrecen?
- ¿Dónde están ubicadas las sedes?
- ¿Cuáles son los horarios de atención?
- ¿Atienden urgencias?
- ¿Atienden mascotas exóticas?
- ¿Tienen servicio a domicilio?
- ¿Cómo agendo una cita?
- ¿Tienen tienda para mascotas?
- ¿Qué métodos de pago aceptan?

Services Provided:
Odontología, nutrición, fisioterapia, ortopedia, cardiología, neurología, cirugía general y asesoría. Solo atendemos perros, no mascotas exóticas. No contamos con servicio a domicilio aún, pero puedes recoger tus compras en tienda. Nuestra tienda en línea está disponible, aunque los productos pueden variar.

Locations:
- Calle 80 #69-70, Bogotá
- Carrera 7 #32-16, Bogotá
- Avenida Suba #100-20, Bogotá

Appointment Process:
Debes llenar el formulario en la parte inferior. Nuestro administrador te asignará unas credenciales por correo. Luego, podrás iniciar sesión y agendar tu cita fácilmente.

If nothing else, say "Lo siento, no puedo ayudarte con eso. Por favor, escribe al correo al final de la página para que nuestro equipo humano pueda ayudarte directamente."

- Atención 24/7
- Los servicios específicos: Odontología, nutrición, fisioterapia, ortopedia, cardiología, neurología, cirugía general y asesoría.
- Ubicación:  Cuentan con 3 sedes: "Calle 80 #69-70" - "Carrera 7 #32-16" - "Avenida Suba #100-20" Todos en la ciudad de bogotá
- Ante preguntas de emergencia, por favor dile que se diriga al call to action del contacto con el correo abajo en la página
- Ante preocupación excesiva asesorar de manera profesional y amable
- Dile que por el momento las redes sociales se encuentran en desarrollo y comunica el teléfono de contacto de "+57 3187677436"


2. FAQ:

- Se responde anteriormente
- Sólo se atienden perros no mascotas exóticas
- No tenemos servicio a domicilio aún, pero nuestra tienda cuenta con opción de recoger en punto de venta
- Llenando el formulario de abajo puedes diligenciar la solicitud por correo, nuestro administrador gentilmente recibirá tu solicitud y te asignara unas credenciales.
- Una vez tengas tus credenciales, te podrás logear para agendar una cita
- Si, nuestra tienda de productos para mascotas está en línea, sin embargo los productos pueden variar 
- Opción de recoger en tienda y pagar con tarjeta.


Answer briefly and concisely. Be gentle and loveful :)

`;
  constructor(
    private http: HttpClient,
    private chatbotToggle: ChatbotToggleService
  ) {}

  ngOnInit() {
    // Get API key from Angular environment
    this.apiKey = environment.gemini.apiKey;
    console.log('API Key loaded:', this.apiKey ? 'Successfully' : 'Failed');
    console.log('API Key length:', this.apiKey ? this.apiKey.length : 0);

    // Add a welcome message
    this.messages.push({
      content:
        'Hola! Soy el asistente virtual de Clínica Shiba. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    });

    this.chatbotToggle.toggle$.subscribe(() => {
      this.isCollapsed = false;
      this.unreadMessages = 0;
    });
  }

  testApiConnection() {
    this.isLoading = true;
    console.log('Testing API connection...');

    // Updated model to use newer gemini model that's still available
    const apiUrl =
      'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent';
    const fullUrl = `${apiUrl}?key=${encodeURIComponent(this.apiKey)}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const payload = {
      contents: [
        {
          role: 'model',
          parts: [{ text: 'Eres un asistente de prueba.' }],
        },
        {
          role: 'user',
          parts: [
            {
              text: "Responde solamente con 'Conexión exitosa' si puedes recibir este mensaje.",
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 20,
      },
    };

    console.log('Full URL being used:', apiUrl);
    console.log(
      'API Key first/last chars:',
      this.apiKey.substring(0, 4) +
        '...' +
        this.apiKey.substring(this.apiKey.length - 4)
    );

    this.http.post(fullUrl, payload, { headers }).subscribe({
      next: (response: any) => {
        console.log('Test API Response:', response);

        this.messages.push({
          content:
            '✅ Prueba de API exitosa. La conexión está funcionando correctamente.',
          sender: 'bot',
          timestamp: new Date(),
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
          timestamp: new Date(),
        });

        this.isLoading = false;
      },
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    // Add user message to chat
    this.messages.push({
      content: this.newMessage,
      sender: 'user',
      timestamp: new Date(),
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
    const apiUrl =
      'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent';
    const fullUrl = `${apiUrl}?key=${encodeURIComponent(this.apiKey)}`;

    console.log('Using API URL:', apiUrl);
    console.log(
      'API Key first/last chars:',
      this.apiKey.substring(0, 4) +
        '...' +
        this.apiKey.substring(this.apiKey.length - 4)
    );

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const payload = {
      contents: [
        {
          role: 'model',
          parts: [{ text: this.systemPrompt }],
        },
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    };

    console.log('Request payload:', JSON.stringify(payload));

    this.http.post(fullUrl, payload, { headers }).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        if (
          response &&
          response.candidates &&
          response.candidates.length > 0 &&
          response.candidates[0].content &&
          response.candidates[0].content.parts &&
          response.candidates[0].content.parts.length > 0
        ) {
          const botResponse = response.candidates[0].content.parts[0].text;
          console.log('Bot response:', botResponse);

          this.messages.push({
            content: botResponse,
            sender: 'bot',
            timestamp: new Date(),
          });

          // Increment unread messages counter if chatbot is collapsed
          if (this.isCollapsed) {
            this.unreadMessages++;
          }
        } else {
          console.error('Invalid response structure:', response);
          this.messages.push({
            content:
              'Lo siento, recibí una respuesta incorrecta del servidor. Por favor, intenta más tarde.',
            sender: 'bot',
            timestamp: new Date(),
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

        let errorMessage =
          'Lo siento, ha ocurrido un error. Por favor, intenta más tarde.';

        if (error.status === 400) {
          errorMessage =
            'Error en la solicitud. Verifique el formato del mensaje.';
        } else if (error.status === 401 || error.status === 403) {
          errorMessage =
            'Error de autenticación o autorización. Posible problema con la API key.';
        } else if (error.status === 429) {
          errorMessage =
            'Demasiadas solicitudes. Por favor, intenta más tarde.';
        } else if (error.status >= 500) {
          errorMessage =
            'Error en el servidor de Gemini. Por favor, intenta más tarde.';
        }

        this.messages.push({
          content: errorMessage,
          sender: 'bot',
          timestamp: new Date(),
        });

        // Increment unread messages counter if chatbot is collapsed
        if (this.isCollapsed) {
          this.unreadMessages++;
        }

        this.isLoading = false;
      },
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
