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
  filteredPets: Mascota[] = [];
  searchQuery: string = '';
  private subscription: Subscription = new Subscription();

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(
    private petService: PetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPets();

    this.subscription.add(
      this.petService.getPets().subscribe(pets => {
        this.pets = pets;
        this.updatePagination();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadPets(): void {
    this.petService.getPets().subscribe(pets => {
      this.pets = pets;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    const filteredPets = this.searchQuery.trim() 
      ? this.petService.searchPets(this.searchQuery)
      : this.pets;

    this.totalPages = Math.ceil(filteredPets.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    this.currentPage = Math.max(1, this.currentPage);

    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredPets = filteredPets.slice(startIndex, startIndex + this.pageSize);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  editPet(id: number): void {
    this.router.navigate(['/pets/edit', id]);
  }

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