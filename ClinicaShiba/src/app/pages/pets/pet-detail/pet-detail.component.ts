import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from '../../../model/mascota';
import { PetService } from '../../../services/pet.service';

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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const petId = +id;
      this.pet = this.petService.getPetById(petId);
      if (!this.pet) {
        this.router.navigate(['/pets']);
      }
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
