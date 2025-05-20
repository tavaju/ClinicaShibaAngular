import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from '../../../../model/veterinario';
import { Mascota } from '../../../../model/mascota';
import { VetService } from '../../../../services/vet.service';
import { TreatmentService } from '../../../../services/treatment.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-vet-dashboard',
  templateUrl: './vet-dashboard.component.html',
  styleUrls: ['./vet-dashboard.component.css']
})
export class VetDashboardComponent implements OnInit {
  currentVeterinario: Veterinario | null = null;
  treatedPets: Mascota[] = [];
  loading = true;
  error = false;
  constructor(
    private vetService: VetService,
    private treatmentService: TreatmentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vetService.vetHome().subscribe({
      next: (vet) => {
        this.currentVeterinario = vet;
        if (vet && vet.id) {
          this.loadTreatedPets(vet.id);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading veterinarian info:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  loadTreatedPets(vetId: number): void {
    this.treatmentService.getPetsByVeterinarioId(vetId).subscribe({
      next: (pets) => {
        this.treatedPets = pets;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading treated pets:', err);
        this.loading = false;
      }
    });
  }
    // Add a public method to navigate to the login page
  navigateToLogin(): void {
    this.router.navigate(['/login/vet']);
  }
  
  /**
   * Logs the user out and redirects to the home page
   */
  logout(): void {
    console.log('Veterinario: Logout process initiated');
    this.authService.logout().subscribe({
      next: () => {
        console.log('Veterinario: Logout successful');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Veterinario: Error during logout:', err);
        // Even if there's an error, navigate to home
        this.router.navigate(['/']);
      }
    });
  }
}
