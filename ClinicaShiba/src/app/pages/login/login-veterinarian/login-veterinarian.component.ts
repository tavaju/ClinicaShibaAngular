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
        // Store vet ID in localStorage for future reference
        localStorage.setItem('currentVetId', vet.id!.toString());
        
        // Redirect to the vet dashboard
        this.router.navigate(['/vets/dashboard']);
      },
      error: (error) => {
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
}
