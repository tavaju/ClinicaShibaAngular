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

  constructor(private vetService: VetService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.vetService.authenticateVet(this.cedula, this.password).subscribe({
      next: (vet) => {
        // Si el login es exitoso, redirigir a /vets/info con la cédula como parámetro
        this.router.navigate(['/vets/info'], {
          queryParams: { cedula: this.cedula },
        });
      },
      error: (error) => {
        // Mostrar el mensaje de error si el login falla
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
}
