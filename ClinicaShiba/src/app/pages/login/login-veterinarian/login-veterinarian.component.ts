import { Component } from '@angular/core';
import { VetService } from '../../../services/vet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-veterinarian',
  templateUrl: './login-veterinarian.component.html',
  styleUrls: ['./login-veterinarian.component.css'],
})
export class LoginVeterinarianComponent {
  cedula: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string | null = null;
  recaptchaToken: string | null = null;
  captchaValid: boolean = false;
  mostrarPassword: boolean = false;

  constructor(private vetService: VetService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.captchaValid) {
      this.errorMessage =
        'Por favor, espere mientras verificamos que no es un robot';
      return;
    }

    this.vetService.loginVet(this.cedula, this.password).subscribe({
      next: (token) => {
        localStorage.setItem('token', token); // Usa la misma clave que el interceptor

        // Ahora pide los datos del veterinario autenticado
        this.vetService.vetHome().subscribe({
          next: (vet) => {
            localStorage.setItem('currentVet', JSON.stringify(vet));
            this.router.navigate(['/vets/dashboard']);
          },
          error: () => {
            this.errorMessage =
              'No se pudo obtener información del veterinario';
          },
        });
      },
      error: () => {
        this.errorMessage = 'Cédula o contraseña incorrectos';
      },
    });
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  onCaptchaResolved(token: string) {
    this.recaptchaToken = token;
    this.captchaValid = true;
    this.errorMessage = null;
  }

  onCaptchaError() {
    this.recaptchaToken = null;
    this.captchaValid = false;
    this.errorMessage =
      'Error al verificar reCAPTCHA. Por favor, recargue la página e intente nuevamente.';
  }
}
