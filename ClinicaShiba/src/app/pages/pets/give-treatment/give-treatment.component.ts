import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentService } from '../../../services/treatment.service';
import { Droga } from '../../../model/droga';

@Component({
  selector: 'app-give-treatment',
  templateUrl: './give-treatment.component.html',
  styleUrls: ['./give-treatment.component.css'],
})
export class GiveTreatmentComponent implements OnInit {
  mascotaId!: number;
  veterinarioId!: number;
  selectedDrogaId!: number;
  availableDrugs: Droga[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private treatmentService: TreatmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mascotaId = Number(this.route.snapshot.paramMap.get('mascotaId'));
    
    // Get current veterinarian ID from localStorage
    const currentVetId = localStorage.getItem('currentVetId');
    if (currentVetId) {
      this.veterinarioId = Number(currentVetId);
    } else {
      this.errorMessage = 'No se encontró información del veterinario. Por favor, inicia sesión.';
    }
    
    this.fetchAvailableDrugs();
  }

  fetchAvailableDrugs(): void {
    this.treatmentService.getAvailableDrugs().subscribe({
      next: (drugs) => {
        this.availableDrugs = drugs;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching drugs:', error);
        this.errorMessage = `No se pudieron cargar los medicamentos disponibles: ${error.message}`;
        this.loading = false;
      }
    });
  }

  giveTreatment(): void {
    if (!this.selectedDrogaId) {
      this.errorMessage = 'Por favor, selecciona un medicamento.';
      return;
    }

    if (!this.veterinarioId) {
      this.errorMessage = 'No se encontró información del veterinario. Por favor, inicia sesión.';
      return;
    }

    this.loading = true;
    this.treatmentService
      .createTreatment(this.mascotaId, this.veterinarioId, this.selectedDrogaId)
      .subscribe({
        next: () => {
          alert('¡Tratamiento dado exitosamente!');
          this.router.navigate(['/vets/dashboard']);
        },
        error: (error) => {
          console.error('Error applying treatment:', error);
          this.errorMessage = error.message || 'Error al aplicar el tratamiento.';
          this.loading = false;
        },
      });
  }
}