import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VetService } from '../../../../services/vet.service';
import { Veterinario } from '../../../../model/veterinario';

@Component({
  selector: 'app-vet-form',
  templateUrl: './vet-form.component.html',
  styleUrls: ['./vet-form.component.css'],
})
export class VetFormComponent implements OnInit {
  vetForm!: FormGroup;
  isEditMode = false;
  vetId?: number;

  constructor(
    private fb: FormBuilder,
    private vetService: VetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.vetForm = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      especialidad: ['', Validators.required],
      foto: [''],
      contrasena: [''],
      changePassword: [false],
      newPassword: [''],
      confirmPassword: [''],
      estado: [true, Validators.required], // Add estado control
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.vetId = +id;
      this.vetService.getVetById(this.vetId).subscribe((vet) => {
        this.vetForm.patchValue({
          cedula: vet.cedula,
          nombre: vet.nombre,
          especialidad: vet.especialidad,
          foto: vet.foto,
          estado: vet.estado, // Patch estado value
        });
      });
    }
  }

  onSubmit(): void {
    if (this.vetForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const formData = this.vetForm.value;

    // Validate password confirmation during creation
    if (!this.isEditMode && formData.contrasena !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Create an instance of Veterinario
    const vetData = new Veterinario(
      formData.cedula,
      formData.nombre,
      formData.especialidad,
      formData.contrasena || '',
      undefined, // Pass undefined for administrador
      formData.foto,
      undefined, // Pass undefined for mascotas
      undefined, // Pass undefined for tratamientos
      this.vetId, // Use vetId if available
      formData.estado // Include estado
    );

    if (this.isEditMode && this.vetId) {
      this.vetService
        .updateVet(
          this.vetId,
          vetData,
          formData.changePassword,
          formData.newPassword,
          formData.confirmPassword
        )
        .subscribe({
          next: () => this.router.navigate(['/vets']),
          error: (err) => {
            console.error('Error al actualizar el veterinario:', err);
            alert('Error al actualizar el veterinario.');
          },
        });
    } else {
      this.vetService.addVet(vetData, formData.confirmPassword).subscribe({
        next: () => this.router.navigate(['/vets']),
        error: (err) => {
          console.error('Error al crear el veterinario:', err);
          alert('Error al crear el veterinario.');
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/vets']);
  }
}
