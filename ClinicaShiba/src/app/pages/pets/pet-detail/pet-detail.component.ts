import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Mascota } from '../../../model/mascota';
import { Cliente } from '../../../model/cliente';
import { HistorialMedico } from '../../../model/historial-medico';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css'],
})
export class PetDetailComponent implements OnInit {
  pet?: Mascota;
  cliente?: Cliente;
  isLoading: boolean = true;
  historialMedico: HistorialMedico[] = [];
  historialLoading: boolean = false;
  historialError: string | null = null;

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el id de la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const petId = +id; // Convertir a número

      // Realizar la solicitud para obtener los detalles de la mascota
      this.petService.getPetByIdFromApi(petId).subscribe({
        next: (pet) => {
          console.log('Mascota obtenida:', pet);
          this.pet = pet;

          // Una vez tenemos la mascota, si tiene cliente asociado, cargamos sus datos
          if (pet.cliente?.cedula) {
            this.petService.getClienteByCedula(pet.cliente.cedula).subscribe({
              next: (cliente) => {
                console.log('Cliente obtenido:', cliente);
                this.cliente = cliente;

                // Asignamos el cliente completo a la mascota
                this.pet!.cliente = cliente;
                this.isLoading = false;

                // Cargamos el historial médico
                this.cargarHistorialMedico(petId);
              },
              error: (error) => {
                console.error('Error al cargar el cliente:', error);
                this.isLoading = false;

                // Intentar cargar el historial médico aunque fallara la carga del cliente
                this.cargarHistorialMedico(petId);
              },
            });
          } else {
            this.isLoading = false;
            // Cargamos el historial médico incluso si no hay cliente
            this.cargarHistorialMedico(petId);
          }
        },
        error: (error) => {
          console.error('Error al cargar la mascota:', error);
          this.router.navigate(['/pets']); // Si hay error, redirigir a la lista
          this.isLoading = false;
        },
      });
    } else {
      this.router.navigate(['/pets']);
    }
  }

  cargarHistorialMedico(petId: number): void {
    this.historialLoading = true;
    this.petService.getHistorialMedico(petId).subscribe({
      next: (historial) => {
        this.historialMedico = historial;
        this.historialLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar el historial médico:', error);
        this.historialError = 'No se pudo cargar el historial médico';
        this.historialLoading = false;
      },
    });
  }

  navigateToEdit(): void {
    if (this.pet?.id) {
      this.router.navigate(['/pets/edit', this.pet.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/vets/dashboard']);
  }

  // Método para formatear fechas
  formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
