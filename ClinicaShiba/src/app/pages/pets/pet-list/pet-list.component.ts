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
    // Initial load
    this.loadPets();
    
    // Subscribe to regular updates
    this.subscription.add(
      this.petService.findAll().subscribe(pets => {
        this.pets = pets;
      })
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions when component is destroyed
    this.subscription.unsubscribe();
  }

  loadPets(): void {
    this.petService.findAll().subscribe(pets => {
      this.pets = pets;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.subscription.add(
        this.petService.searchPets(this.searchQuery).subscribe(pets => {
          this.pets = pets;
        })
      );
    } else {
      this.loadPets();
    }
  }

  editPet(id: number): void {
    this.router.navigate(['/pets/edit', id]);
  }
}
