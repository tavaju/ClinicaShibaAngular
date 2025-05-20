import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private authService: AuthService, private router: Router) {}

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
