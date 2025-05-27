import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from '../../../../model/veterinario';
import { Mascota } from '../../../../model/mascota';
import { Cita } from '../../../../model/cita';
import { VetService } from '../../../../services/vet.service';
import { TreatmentService } from '../../../../services/treatment.service';
import { AuthService } from '../../../../services/auth.service';
import { AppointmentService } from '../../../../services/appointment.service';

@Component({
  selector: 'app-vet-dashboard',
  templateUrl: './vet-dashboard.component.html',
  styleUrls: ['./vet-dashboard.component.css'],
})
export class VetDashboardComponent implements OnInit {
  currentVeterinario: Veterinario | null = null;
  treatedPets: Mascota[] = [];
  appointments: Cita[] = [];
  loading = true;
  error = false;
  
  constructor(
    private vetService: VetService,
    private treatmentService: TreatmentService,
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Remove expired appointments on component load
    this.appointmentService.removeExpiredAppointments();
    
    this.vetService.vetHome().subscribe({
      next: (vet) => {
        this.currentVeterinario = vet;
        if (vet && vet.id) {
          this.loadTreatedPets(vet.id);
          this.loadAppointments(vet.id);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading veterinarian info:', err);
        this.error = true;
        this.loading = false;
      },
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
      },
    });
  }

  loadAppointments(vetId: number): void {
    this.appointments = this.appointmentService.getAppointmentsByVet(vetId);
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
  /**
   * Toggle appointment status with confirmation
   */
  toggleAppointmentStatus(appointmentId: string, currentStatus: boolean): void {
    // If currently enabled and trying to disable, show confirmation
    if (currentStatus) {
      const confirmDisable = confirm('¿Estás seguro que quieres deshabilitar esta cita?');
      
      if (confirmDisable) {
        // User confirmed - disable the appointment (remove from list)
        this.appointmentService.updateAppointmentStatus(appointmentId, false);
        // Reload appointments to reflect changes
        if (this.currentVeterinario && this.currentVeterinario.id) {
          this.loadAppointments(this.currentVeterinario.id);
        }
      }
      // If user cancels, do nothing (appointment stays enabled)
    } else {
      // If currently disabled and trying to enable, just enable it
      this.appointmentService.updateAppointmentStatus(appointmentId, true);
      // Reload appointments to reflect changes
      if (this.currentVeterinario && this.currentVeterinario.id) {
        this.loadAppointments(this.currentVeterinario.id);
      }
    }
  }

  /**
   * Format date for display
   */
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
