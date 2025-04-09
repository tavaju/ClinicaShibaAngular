import { Component } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string | null = null;

  constructor(private clientService: ClientService, private router: Router) {}

  onSubmit() {
    this.clientService.loginClient(this.email, this.password).subscribe(
      (response) => {
        // Si el login es exitoso, redirigir a /pets
        this.router.navigate(['/pets']);
      },
      (error) => {
        // Mostrar el mensaje de error si el login falla
        this.errorMessage = error.error?.message || 'Correo o contraseña incorrectos';
      }
    );
  }

  togglePassword() {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
  }
}
