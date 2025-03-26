import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../../model/mascota';
import { PetService } from '../../../services/pet.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {
  petForm: FormGroup;
  isEditMode = false;
  petId?: number;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.petForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      raza: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0)]],
      enfermedad: [''],
      foto: [''],
      estado: [true],
      cedulaCliente: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.petId = +id;
      const pet = this.petService.getPetById(this.petId);
      if (pet) {
        // Fill the form with pet data
        this.petForm.patchValue({
          nombre: pet.nombre,
          edad: pet.edad,
          raza: pet.raza,
          peso: pet.peso,
          enfermedad: pet.enfermedad,
          foto: pet.foto,
          estado: pet.estado,
          cedulaCliente: pet.cliente?.cedula || ''
        });
      } else {
        // Navigate back if pet not found
        this.router.navigate(['/pets']);
      }
    }
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      const petData = this.petForm.value;
      
      if (this.isEditMode && this.petId) {
        this.petService.updatePet({ 
          ...petData, 
          id: this.petId 
        });
      } else {
        this.petService.addPet(petData);
      }
      this.router.navigate(['/pets']);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.petForm.controls).forEach(key => {
        this.petForm.get(key)?.markAsTouched();
      });
    }
  }
}
