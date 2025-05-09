import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.css'],
})
export class CtaComponent implements OnInit {
  nombre = '';
  email = '';
  telefono = '';
  asunto = '';
  mensaje = '';
  formStatus: string | null = null;
  timeoutId: any;

  ngOnInit(): void {
    // Initialize EmailJS with your public key
    emailjs.init({
      publicKey: "dGky0iB83XmrQ3Cvc",
    });
  }

  handleSubmit(): void {
    if (!this.nombre || !this.email || !this.asunto || !this.mensaje) return;

    this.sendEmail();
  }

  sendEmail(): void {
    const templateParams = {
      name: this.nombre,
      email: this.email,
      subject: this.asunto,
      message: this.mensaje,
    };

    // If phone exists, include it in templateParams
    if (this.telefono) {
      templateParams.message = templateParams.message + '\nTeléfono: ' + this.telefono;
    }

    emailjs
      .send("service_57iulat", "template_22177ks", templateParams)
      .then(() => {
        // Correo para el cliente
        this.sendClientEmail(templateParams);
      })
      .catch((error: any) => {
        console.log("Error sending email:", error);
        this.formStatus = 'error';
        
        // Ocultar mensaje de error luego de 5s
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.formStatus = null;
        }, 5000);
      });
  }

  sendClientEmail(templateParams: any): void {
    // Send confirmation email to the client
    emailjs
      .send("service_57iulat", "template_7ikpmzg", templateParams)
      .then(() => {
        this.formStatus = 'success';
        
        // Limpiar campos
        this.nombre = '';
        this.email = '';
        this.telefono = '';
        this.asunto = '';
        this.mensaje = '';
        
        // Ocultar mensaje luego de 5s
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.formStatus = null;
        }, 5000);
      })
      .catch((error: any) => {
        console.log("Error sending client email:", error);
        // Even if the client email fails, we still consider the form submission successful
        // since the main email was sent
        this.formStatus = 'success';
        
        // Limpiar campos
        this.nombre = '';
        this.email = '';
        this.telefono = '';
        this.asunto = '';
        this.mensaje = '';
        
        // Ocultar mensaje luego de 5s
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.formStatus = null;
        }, 5000);
      });
  }
}
