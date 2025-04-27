import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Veterinario } from '../../../../model/veterinario';
import { Mascota } from '../../../../model/mascota';
import { VetService } from '../../../../services/vet.service';
import { TreatmentService } from '../../../../services/treatment.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get veterinarian ID from localStorage (will be set during login)
    const vetId = localStorage.getItem('currentVetId');
    
    if (vetId) {
      this.loadVeterinarioInfo(Number(vetId));
    } else {
      this.error = true;
      this.loading = false;
      console.error('No veterinarian ID found in localStorage');
    }
  }

  loadVeterinarioInfo(id: number): void {
    this.vetService.getVetById(id).subscribe({
      next: (vet) => {
        this.currentVeterinario = vet;
        this.loadTreatedPets(id);
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
}
