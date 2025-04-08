import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from '../../../services/pet.service';
import { ClientService } from '../../../services/client.service';
import { Mascota } from '../../../model/mascota';
import { finalize, catchError, of } from 'rxjs';

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
    private clientService: ClientService,
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
    }
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      const petData = {...this.petForm.value};
      const cedulaCliente = petData.cedulaCliente;
      
      // Remove cedulaCliente from the pet data object
      delete petData.cedulaCliente;
      
      // Make sure we're sending valid data types
      if (petData.edad) petData.edad = Number(petData.edad);
      if (petData.peso) petData.peso = Number(petData.peso);
      petData.estado = Boolean(petData.estado);

      // First, validate that the client exists with the provided cédula
      this.clientService.getClientByCedula(cedulaCliente)
        .pipe(
          catchError(error => {
            console.error('Error verificando cliente por cédula:', error);
            alert(`No se encontró un cliente con la cédula ${cedulaCliente}. Por favor verifica que la cédula sea correcta.`);
            return of(null);
          })
        )
        .subscribe(client => {
          if (client) {
            console.log('Cliente encontrado:', client);
            this.savePet(petData, cedulaCliente);
          }
        });
    } else {
      // Mark all fields as touched to trigger validation errors
      Object.keys(this.petForm.controls).forEach(key => {
        this.petForm.get(key)?.markAsTouched();
      });
      alert('Por favor completa todos los campos requeridos correctamente');
    }
  }

  // Extract the pet saving logic to a separate method
  private savePet(petData: any, cedulaCliente: string): void {
    if (this.isEditMode && this.petId) {
      // Llamada para actualizar la mascota
      this.petService.updatePet({ 
        ...petData, 
        id: this.petId 
      }, cedulaCliente).subscribe({
        next: (updatedPet) => {
          console.log('Mascota actualizada:', updatedPet);
          this.router.navigate(['/pets']);
        },
        error: (err) => {
          console.error('Error al actualizar la mascota', err);
          alert('Error al actualizar la mascota: ' + this.getErrorMessage(err));
        }
      });
    } else {
      // Llamada para agregar una nueva mascota
      this.petService.addPet(petData, cedulaCliente).subscribe({
        next: (newPet) => {
          console.log('Mascota agregada exitosamente:', newPet);
          this.router.navigate(['/pets']);
        },
        error: (err) => {
          console.error('Error al agregar la mascota', err);
          alert('Error al agregar la mascota: ' + this.getErrorMessage(err));
        }
      });
    }
  }

  // Helper method to extract error messages
  private getErrorMessage(error: any): string {
    if (error.error?.message) {
      return error.error.message;
    }
    if (error.status === 400) {
      return 'Datos inválidos o cliente no encontrado';
    }
    return 'Error de servidor. Inténtalo de nuevo más tarde.';
  }
}
