import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VetService } from '../../../../services/vet.service';
import { Veterinario } from '../../../../model/veterinario';

@Component({
  selector: 'app-vet-info',
  templateUrl: './vet-info.component.html',
  styleUrls: ['./vet-info.component.css'],
})
export class VetInfoComponent implements OnInit {
  @Input() veterinarioId?: number; // Allow the component to receive a vet ID as input
  veterinario!: Veterinario;
  loading = true;
  error = false;

  constructor(
    private vetService: VetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // First check if the component received a veterinarioId as input
    if (this.veterinarioId) {
      this.loadVetDetails(this.veterinarioId);
    } else {
      // If no input, check if there's an ID in the route
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.loadVetDetails(+idParam);
      } else {
        // If no route parameter, check if there's a current vet ID in localStorage
        const currentVetId = localStorage.getItem('currentVetId');
        if (currentVetId) {
          this.loadVetDetails(+currentVetId);
        } else {
          // If no ID is available anywhere, show an error
          this.error = true;
          this.loading = false;
          console.error('No veterinarian ID provided');
        }
      }
    }
  }

  loadVetDetails(vetId: number): void {
    this.vetService.getVetById(vetId).subscribe({
      next: (vet) => {
        this.veterinario = vet;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading veterinarian details:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  // Add a method to get estado text
  getEstadoTexto(): string {
    return this.veterinario?.estado ? 'Activo' : 'Inactivo';
  }

  navigateToEdit(): void {
    if (this.veterinario?.id) {
      this.router.navigate(['/vets/edit', this.veterinario.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
