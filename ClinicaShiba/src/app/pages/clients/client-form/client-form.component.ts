import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Cliente } from '../../../model/cliente';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode = false;
  clientId?: number;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Definir los campos como opcionales
    this.clientForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.maxLength(100)]], // No obligatorio para editar
      correo: ['', [Validators.email]], // No obligatorio para editar
      celular: ['', [Validators.maxLength(10)]], // No obligatorio para editar
      contrasena: ['', [Validators.minLength(8), Validators.maxLength(50)]], // No obligatorio para editar
      confirmPassword: [''],
      changePassword: [false],
      newPassword: [''],
      confirmNewPassword: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clientId = +id;
      this.clientService.getClientById(this.clientId).subscribe({
        next: (client) => {
          this.clientForm.patchValue({
            cedula: client.cedula,
            nombre: client.nombre,
            correo: client.correo,
            celular: client.celular,
          });
        },
        error: () => {
          this.router.navigate(['/clients']);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const formData = this.clientForm.value;
      console.log('Datos del formulario:', formData); // Depuración

      if (this.isEditMode && this.clientId) {
        // Si el cliente tiene algún campo cambiado, solo actualiza esos campos
        const updatedClient: Cliente = {
          id: this.clientId,
          cedula: formData.cedula,
          nombre: formData.nombre || undefined, // Solo actualiza si se cambió
          correo: formData.correo || undefined, // Solo actualiza si se cambió
          celular: formData.celular || undefined, // Solo actualiza si se cambió
          contrasena: formData.contrasena || undefined, // Solo actualiza si se cambió
        };

        // Llamar al servicio para actualizar el cliente
        this.clientService
          .updateClient(
            this.clientId,
            updatedClient,
            formData.changePassword,
            formData.newPassword,
            formData.confirmNewPassword
          )
          .subscribe({
            next: () => this.router.navigate(['/clients']),
            error: (err) => {
              console.error('Error al actualizar el cliente:', err);
              alert('Error al actualizar el cliente.');
            },
          });
      } else {
        // Crear cliente
        const newClient = new Cliente({
          cedula: formData.cedula,
          nombre: formData.nombre,
          correo: formData.correo,
          celular: formData.celular,
          contrasena: formData.confirmPassword,

        });

        this.clientService
          .addClient(newClient, formData.confirmPassword)
          .subscribe({
            next: () => this.router.navigate(['/clients']),
            error: (err) => {
              console.error('Error al crear el cliente:', err);
              alert('Error al crear el cliente.');
            },
          });
      }
    } else {
      Object.keys(this.clientForm.controls).forEach((key) => {
        const control = this.clientForm.get(key);
        control?.markAsTouched();
      });
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
