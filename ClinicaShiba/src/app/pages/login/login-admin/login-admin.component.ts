import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  cedula: string = '';
  password: string = '';
  errorMessage: string | null = null;
  recaptchaToken: string | null = null;
  captchaValid: boolean = false;

  constructor(private adminService: AdminService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.captchaValid) {
      this.errorMessage = 'Por favor, espere mientras verificamos que no es un robot';
      return;
    }

    this.adminService.loginAdmin(this.cedula, this.password).subscribe({
      next: (token) => {
        localStorage.setItem('token', token); // Usa la misma clave que el interceptor

        // Ahora pide los datos del administrador autenticado
        this.adminService.adminHome().subscribe({
          next: (admin) => {
            localStorage.setItem('currentAdmin', JSON.stringify(admin));
            this.router.navigate(['/admin/dashboard']);
          },
          error: () => {
            this.errorMessage = 'No se pudo obtener información del administrador';
          }
        });
      },
      error: () => {
        this.errorMessage = 'Cédula o contraseña incorrectos';
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
