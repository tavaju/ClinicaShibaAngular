import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Mascota } from '../../../model/mascota';
import { Cliente } from '../../../model/cliente';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  pet?: Mascota;
  cliente?: Cliente;
  isLoading: boolean = true;

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
              },
              error: (error) => {
                console.error('Error al cargar el cliente:', error);
                this.isLoading = false;
              }
            });
          } else {
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error('Error al cargar la mascota:', error);
          this.router.navigate(['/pets']); // Si hay error, redirigir a la lista
          this.isLoading = false;
        }
      });
    } else {
      this.router.navigate(['/pets']);
    }
  }

  navigateToEdit(): void {
    if (this.pet?.id) {
      this.router.navigate(['/pets/edit', this.pet.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/pets']);
  }
}
