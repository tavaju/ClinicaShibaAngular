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
    // Recupera el veterinario desde localStorage
    const vetStr = localStorage.getItem('currentVet');
    if (vetStr) {
      const vetObj = JSON.parse(vetStr);
      const cedula = vetObj.cedula;
      if (cedula) {
        this.loadVeterinarioInfoByCedula(cedula);
      } else {
        this.error = true;
        this.loading = false;
        console.error('No veterinarian cedula found in localStorage');
      }
    } else {
      this.error = true;
      this.loading = false;
      console.error('No veterinarian found in localStorage');
    }
  }

  loadVeterinarioInfoByCedula(cedula: string): void {
    this.vetService.getVetByCedula(cedula).subscribe({
      next: (vet) => {
        this.currentVeterinario = vet;
        this.loadTreatedPets(vet.id!);
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
