import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ChatbotToggleService } from '../chatbot/chatbot-toggle.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {  constructor(
    private authService: AuthService, 
    private router: Router,
    private chatbotService: ChatbotToggleService
  ) {}

  /**
   * Opens the chatbot when the help button is clicked
   */
  abrirChatbot(): void {
    this.chatbotService.openChatbot();
  }

  /**
   * Navigates to the dashboard based on user role,
   * or to the login page if user is not authenticated
   */
  navigateToDashboard(event: Event): void {
    event.preventDefault(); // Prevent default anchor behavior

    if (this.authService.isAuthenticated()) {
      this.authService.navigateToDashboard();
    } else {
      // If not authenticated, redirect to login
      this.router.navigate(['/login']);
    }
  }
}
