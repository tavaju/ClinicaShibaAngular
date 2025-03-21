import { Component } from '@angular/core';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.css'],
})
export class CtaComponent {
  nombre = '';
  email = '';
  telefono = '';
  mensaje = '';
  formStatus: string | null = null;
  timeoutId: any;

  handleSubmit(): void {
    if (!this.nombre || !this.email || !this.mensaje) return;

    this.formStatus = 'success';

    // Limpiar campos
    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.mensaje = '';

    // Ocultar mensaje luego de 5s
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.formStatus = null;
    }, 5000);
  }
}
