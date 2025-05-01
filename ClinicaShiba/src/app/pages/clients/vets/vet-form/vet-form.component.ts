import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VetService } from '../../../../services/vet.service';
import { Veterinario } from '../../../../model/veterinario';
import { AdminService } from '../../../../services/admin.service';
import { Administrador } from '../../../../model/administrador';

@Component({
  selector: 'app-vet-form',
  templateUrl: './vet-form.component.html',
  styleUrls: ['./vet-form.component.css'],
})
export class VetFormComponent implements OnInit {
  vetForm!: FormGroup;
  isEditMode = false;
  vetId?: number;
  cedulaExists = false;

  constructor(
    private fb: FormBuilder,
    private vetService: VetService,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService
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

  validateCedula(): void {
    const cedula = this.vetForm.get('cedula')?.value;
    if (cedula) {
      this.vetService.checkCedulaExists(cedula).subscribe({
        next: (exists) => {
          this.cedulaExists = exists;
          if (exists) {
            alert(`NO SE PUEDE CREAR UN VETERINARIO CON LA CÉDULA ${cedula} PORQUE YA EXISTE`);
          }
        },
        error: (err) => {
          console.error('Error al verificar la cédula:', err);
        },
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

    if (this.isEditMode && this.vetId) {
      // For editing, continue using the existing veterinarian instance with updates
      const vetData = new Veterinario(
        formData.cedula,
        formData.nombre,
        formData.especialidad,
        formData.contrasena || '',
        undefined, // Keep the existing administrador
        formData.foto,
        undefined, // Pass undefined for mascotas
        undefined, // Pass undefined for tratamientos
        this.vetId, // Use vetId if available
        formData.estado // Include estado
      );

      this.vetService
        .updateVet(
          this.vetId,
          vetData,
          formData.changePassword,
          formData.newPassword,
          formData.confirmPassword
        )
        .subscribe({
          next: () => this.router.navigate(['/admin/dashboard']),
          error: (err) => {
            console.error('Error al actualizar el veterinario:', err);
            alert('Error al actualizar el veterinario.');
          },
        });
    } else {
      // For creating a new veterinarian, get the admin ID from localStorage
      const currentAdminId = localStorage.getItem('currentAdminId');
      
      if (!currentAdminId) {
        alert('No se encontró información del administrador. Por favor, inicie sesión nuevamente.');
        this.router.navigate(['/login/admin']);
        return;
      }

      // Get the admin object using the ID
      this.adminService.getAdminById(Number(currentAdminId)).subscribe({
        next: (admin) => {
          // Create the veterinarian with the admin assigned
          const adminObj = new Administrador(
            admin.cedula,
            admin.nombre,
            admin.contrasena,
            admin.veterinarios,
            admin.id
          );
          
          console.log('Admin ID being assigned to veterinarian:', adminObj.id);

          const vetData = new Veterinario(
            formData.cedula,
            formData.nombre,
            formData.especialidad,
            formData.contrasena || '',
            adminObj, // Assign the admin object here
            formData.foto,
            undefined, // Pass undefined for mascotas
            undefined, // Pass undefined for tratamientos
            undefined, // No ID for new veterinarian
            formData.estado // Include estado
          );

          this.vetService.addVet(vetData, formData.confirmPassword, adminObj.id!).subscribe({
            next: (response) => {
              console.log('Response from backend:', response);
              alert('Veterinario creado exitosamente y asignado al administrador actual.');
              this.router.navigate(['/admin/dashboard']);
            },
            error: (err) => {
              console.error('Error al crear el veterinario:', err);
              if (err.status === 200 || err.status === 201) {
                // Handle cases where the backend returns a success status but the frontend misinterprets it
                alert('Veterinario creado exitosamente y asignado al administrador actual.');
                this.router.navigate(['/admin/dashboard']);
              } else {
                alert('Error al crear el veterinario. Verifica que la cédula no esté duplicada o que los datos sean correctos.');
              }
            },
          });
        },
        error: (err) => {
          console.error('Error al obtener información del administrador:', err);
          alert('Error al obtener información del administrador. Por favor, inicie sesión nuevamente.');
          this.router.navigate(['/login/admin']);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
