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

  constructor(private adminService: AdminService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.adminService.authenticateAdmin(this.cedula, this.password).subscribe({
      next: (admin) => {
        // Store admin ID in localStorage for future reference
        localStorage.setItem('currentAdminId', admin.id!.toString());
        
        // Redirect to the admin dashboard
        this.router.navigate(['/dashboard']);
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
