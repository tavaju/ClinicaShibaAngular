import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from '../../../model/mascota';
import { PetService } from '../../../services/pet.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit, OnDestroy {
  pets: Mascota[] = [];
  searchQuery: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private petService: PetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPets();

    this.subscription.add(
      this.petService.getPets().subscribe(pets => {
        this.pets = pets;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadPets(): void {
    this.petService.getPets().subscribe(pets => {
      this.pets = pets;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.pets = this.petService.searchPets(this.searchQuery);
    } else {
      this.loadPets();
    }
  }

  editPet(id: number): void {
    this.router.navigate(['/pets/edit', id]);
  }

  // Método para desactivar la mascota
  deactivatePet(id: number): void {
    if (confirm('¿Estás seguro de que quieres desactivar esta mascota?')) {
      this.petService.deactivatePet(id).subscribe({
        next: () => {
          alert('Mascota desactivada correctamente');
          this.loadPets();  // Recarga la lista de mascotas después de desactivar
        },
        error: (err) => {
          console.error('Error al desactivar la mascota', err);
          alert('Hubo un error al desactivar la mascota');
        }
      });
    }
  }
}
