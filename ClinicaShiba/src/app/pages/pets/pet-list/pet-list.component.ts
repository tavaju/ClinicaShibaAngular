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
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit, OnDestroy {
  pets: Mascota[] = [];
  petsEstado: Map<number, boolean> = new Map(); // Store estado of each Mascota
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadPets(): void {
    this.petService.getPets().subscribe((pets) => {
      this.pets = pets;
      this.checkTreatments();
      this.fetchMascotaEstados(); // Fetch estado for each Mascota
    });
  }

  fetchMascotaEstados(): void {
    this.pets.forEach((pet) => {
      if (pet.id) {
        this.petService.getMascotaEstado(pet.id).subscribe((estado) => {
          this.petsEstado.set(pet.id!, estado);
        });
      }
    });
  }

  canGiveTreatment(petId: number | undefined): boolean {
    if (!petId) return false;
    const isActive = this.petsEstado.get(petId);
    return isActive !== false && !this.hasTreatment(petId);
  }

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
        },
      });
    }
  }

  checkTreatments(): void {
    this.pets.forEach((pet) => {
      if (pet.id) {
        this.treatmentService
          .hasTreatment(pet.id)
          .subscribe((hasTreatment: boolean) => {
            if (hasTreatment) {
              this.petsWithTreatment.add(pet.id!);
            }
          });
      }
    });
  }
}