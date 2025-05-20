import { Component } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent {
  formUser: User = {
    correo: '',
    password: '',
  };
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string | null = null;
  recaptchaToken: string | null = null;
  captchaValid: boolean = false;

  constructor(private clientService: ClientService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.captchaValid) {
      this.errorMessage =
        'Por favor, espere mientras verificamos que no es un robot';
      return;
    }

    this.clientService.loginClient(this.email, this.password).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);

        // Ahora pide los datos del cliente autenticado
        this.clientService.getAuthenticatedClient().subscribe({
          next: (client) => {
            localStorage.setItem('currentClient', JSON.stringify(client));
            // Navega igual que antes
            this.router.navigate(['/cliente/home']);
          },
          error: () => {
            this.errorMessage = 'No se pudo obtener información del cliente';
          },
        });
      },
      error: () => {
        this.errorMessage = 'Correo o contraseña incorrectos';
      },
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
    this.errorMessage =
      'Error al verificar reCAPTCHA. Por favor, recargue la página e intente nuevamente.';
  }
}
