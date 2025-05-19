import { Component } from '@angular/core';
import { VetService } from '../../../services/vet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-veterinarian',
  templateUrl: './login-veterinarian.component.html',
  styleUrls: ['./login-veterinarian.component.css']
})
export class LoginVeterinarianComponent {
  cedula: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string | null = null;
  recaptchaToken: string | null = null;
  captchaValid: boolean = false;

  constructor(private vetService: VetService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    
    if (!this.captchaValid) {
      this.errorMessage = 'Por favor, espere mientras verificamos que no es un robot';
      return;
    }
    
    this.vetService.authenticateVet(this.cedula, this.password).subscribe({
      next: (response: { token: string }) => {
        // Store JWT token in localStorage for future reference
        localStorage.setItem('jwtToken', response.token);
        
        // Redirect to the vet dashboard
        this.router.navigate(['/vets/dashboard']);
      },
      error: (error: any) => {
        // Show error message if login fails
        this.errorMessage = 'Cédula o contraseña incorrectos';
        console.error('Error de autenticación:', error);
      }
    });
  }

  togglePassword() {
    const passwordField = document.getElementById(
      'password'
    ) as HTMLInputElement;
    passwordField.type =
      passwordField.type === 'password' ? 'text' : 'password';
  }

  onCaptchaResolved(token: string) {
    this.recaptchaToken = token;
    this.captchaValid = true;
    this.errorMessage = null;
  }

  onCaptchaError() {
    this.recaptchaToken = null;
    this.captchaValid = false;
    this.errorMessage = 'Error al verificar reCAPTCHA. Por favor, recargue la página e intente nuevamente.';
  }
}
