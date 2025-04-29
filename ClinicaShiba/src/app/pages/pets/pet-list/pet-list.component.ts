import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from '../../../model/mascota';
import { PetService } from '../../../services/pet.service';
import { TreatmentService } from '../../../services/treatment.service';
import { Subscription, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit, OnDestroy {
  pets: Mascota[] = [];
  searchQuery: string = '';
  private subscription: Subscription = new Subscription();
  petsWithTreatment: Set<number> = new Set<number>();

  constructor(
    private petService: PetService,
    private treatmentService: TreatmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPets();

    this.subscription.add(
      this.petService.getPets().subscribe(pets => {
        this.pets = pets;
        this.checkTreatments();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadPets(): void {
    this.petService.getPets().subscribe(pets => {
      this.pets = pets;
      this.checkTreatments();
    });
  }

  // Método para verificar qué mascotas ya tienen tratamiento
  checkTreatments(): void {
    if (!this.pets.length) return;

    // Creamos un array de observables para consultar cada mascota
    const treatmentChecks = this.pets.map(pet => {
      if (!pet.id) return of(false);
      return this.treatmentService.hasPetReceivedTreatment(pet.id).pipe(
        switchMap(hasTreatment => {
          if (hasTreatment && pet.id) {
            this.petsWithTreatment.add(pet.id);
          }
          return of(hasTreatment);
        })
      );
    });

    // Ejecutamos todas las consultas en paralelo
    this.subscription.add(
      forkJoin(treatmentChecks).subscribe()
    );
  }

  // Verificar si una mascota ya tiene tratamiento
  hasTreatment(petId: number | undefined): boolean {
    if (!petId) return false;
    return this.petsWithTreatment.has(petId);
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
          this.loadPets(); 
        },
        error: (err) => {
          console.error('Error al desactivar la mascota', err);
          alert('Hubo un error al desactivar la mascota');
        }
      });
    }
  }
}
