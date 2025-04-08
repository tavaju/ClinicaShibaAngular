import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Cliente } from '../../../model/cliente';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode = false;
  clientId?: number;
  showPasswordFields = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.maxLength(10)]],
      contrasena: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required]],
      changePassword: [false],
      newPassword: [''],
      confirmNewPassword: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clientId = +id;
      this.loadClient(this.clientId);
      this.updateFormValidation();
    }
  }

  private loadClient(id: number): void {
    this.clientService.getClientById(id).subscribe({
      next: (client) => {
        this.clientForm.patchValue({
          cedula: client.cedula,
          nombre: client.nombre,
          correo: client.correo,
          celular: client.celular
        });
        this.clientForm.get('contrasena')?.clearValidators();
        this.clientForm.get('confirmPassword')?.clearValidators();
        this.clientForm.updateValueAndValidity();
      },
      error: (error) => {
        console.error('Error loading client:', error);
        this.router.navigate(['/clients']);
      }
    });
  }

  private updateFormValidation(): void {
    const changePassword = this.clientForm.get('changePassword');
    const newPassword = this.clientForm.get('newPassword');
    const confirmNewPassword = this.clientForm.get('confirmNewPassword');

    changePassword?.valueChanges.subscribe(value => {
      if (value) {
        newPassword?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(50)]);
        confirmNewPassword?.setValidators([Validators.required]);
      } else {
        newPassword?.clearValidators();
        confirmNewPassword?.clearValidators();
      }
      newPassword?.updateValueAndValidity();
      confirmNewPassword?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const formData = this.clientForm.value;
      
      if (this.isEditMode && this.clientId) {
        this.clientService.updateClient(
          this.clientId,
          {
            id: this.clientId,
            cedula: formData.cedula,
            nombre: formData.nombre,
            correo: formData.correo,
            celular: formData.celular,
            contrasena: formData.contrasena,
            mascotas: []
          },
          formData.changePassword,
          formData.newPassword,
          formData.confirmNewPassword
        ).subscribe({
          next: () => this.router.navigate(['/clients']),
          error: (error) => console.error('Error updating client:', error)
        });
      } else {
        this.clientService.addClient(
          new Cliente({
            cedula: formData.cedula,
            nombre: formData.nombre,
            correo: formData.correo,
            celular: formData.celular,
            contrasena: formData.contrasena,
            mascotas: []
          }),
          formData.confirmPassword
        ).subscribe({
          next: () => this.router.navigate(['/clients']),
          error: (error) => console.error('Error creating client:', error)
        });
      }
    }
  }
}