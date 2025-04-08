import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from '../../../services/pet.service';
import { Mascota } from '../../../model/mascota';

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
      this.petService.getPetByIdFromApi(this.petId).subscribe({
        next: (pet) => {
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
        },
        error: () => {
          this.router.navigate(['/pets']); // Si no existe la mascota, redirigir
        }
      });
    } else {
      this.router.navigate(['/pets']);
    }
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      const petData = this.petForm.value;
      const cedulaCliente = petData.cedulaCliente;
      delete petData.cedulaCliente;

      if (this.isEditMode && this.petId) {
        this.petService.updatePet({ 
          ...petData, 
          id: this.petId 
        }, cedulaCliente).subscribe(() => {
          this.router.navigate(['/pets']);
        });
      } else {
        this.petService.addPet(petData, cedulaCliente).subscribe(() => {
          this.router.navigate(['/pets']);
        });
      }
    } else {
      Object.keys(this.petForm.controls).forEach(key => {
        this.petForm.get(key)?.markAsTouched();
      });
    }
  }
}
