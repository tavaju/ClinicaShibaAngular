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
  allPets: Mascota[] = []; // Store all pets
  pets: Mascota[] = []; // Store current page pets
  petsEstado: Map<number, boolean> = new Map(); // Store estado of each Mascota
  searchQuery: string = '';
  private subscription: Subscription = new Subscription();
  petsWithTreatment: Set<number> = new Set<number>();
  
  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  totalPets: number = 0;
  filteredPets: Mascota[] = []; // Store filtered pets for search

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
      this.allPets = pets;
      this.totalPets = pets.length;
      this.totalPages = Math.ceil(this.totalPets / this.pageSize);
      this.filteredPets = [...this.allPets]; // Initialize filteredPets with all pets
      this.updateDisplayedPets();
      this.checkTreatments();
      this.fetchMascotaEstados();
    });
  }

  updateDisplayedPets(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredPets.length);
    this.pets = this.filteredPets.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedPets();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedPets();
    }
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
      this.filteredPets = this.allPets.filter(pet => 
        pet.nombre?.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        pet.raza?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        pet.enfermedad?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPets = [...this.allPets];
    }
    
    this.totalPets = this.filteredPets.length;
    this.totalPages = Math.ceil(this.totalPets / this.pageSize);
    this.currentPage = 1; // Reset to first page on new search
    this.updateDisplayedPets();
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
    this.allPets.forEach((pet) => {
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