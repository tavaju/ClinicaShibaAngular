import { Component } from '@angular/core';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.css'],
})
export class CtaComponent {
  formStatus: string = '';

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.formStatus = '✅ ¡Mensaje enviado con éxito!';
    setTimeout(() => (this.formStatus = ''), 4000);
  }
}
