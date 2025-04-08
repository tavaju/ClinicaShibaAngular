import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../../../services/pet.service';
import { Mascota } from '../../../model/mascota';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  pet?: Mascota;

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
          console.log('Mascota obtenida:', pet); // Verifica qué datos se están recibiendo
          this.pet = pet;
        },
        error: () => {
          this.router.navigate(['/pets']); // Si hay error, redirigir a la lista
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
