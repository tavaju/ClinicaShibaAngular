import { Component, OnInit, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { PetService } from '../../../services/pet.service';
import { AuthService } from '../../../services/auth.service';
import { VetService } from '../../../services/vet.service';
import { AppointmentService } from '../../../services/appointment.service';
import { DOCUMENT } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Cita } from '../../../model/cita';
import { Veterinario } from '../../../model/veterinario';
// Import for Lucide icons
declare const lucide: any;

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css'],
})
export class ClientInfoComponent implements OnInit, AfterViewInit {
  client: any = null;
  pets: any[] = [];
  
  // Appointment modal properties
  showAppointmentModal = false;
  selectedPetId: number | null = null;
  selectedVetId: number | null = null;
  selectedDate: string = '';
  selectedTime: string = '';
  veterinarians: Veterinario[] = [];
  availableTimeSlots: string[] = [];
  appointmentForm = {
    isValid: false,
    errors: {
      pet: '',
      vet: '',
      date: '',
      time: ''
    }
  };

  constructor(
    private clientService: ClientService,
    private petService: PetService,
    private vetService: VetService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit(): void {
    // Load active veterinarians
    this.loadVeterinarians();
    
    this.clientService.clienteHome().subscribe({
      next: (client) => {
        this.client = client;
        if (client && client.id) {
          this.petService.getPetsByClientId(client.id).subscribe({
            next: (pets) => {
              this.pets = pets;
            },
            error: (err) => {
              console.error(
                `Error buscando mascotas para el cliente ${client.id}:`,
                err
              );
              this.pets = [];
            },
          });
        } else {
          this.pets = [];
        }
      },
      error: (err) => {
        console.error('Error al obtener cliente autenticado:', err);
        this.client = null;
        this.pets = [];
      },
    });
  }

  loadClientAndPets(email: string): void {
    this.clientService.getClientByEmail(email).subscribe({
      next: (client) => {
        this.client = client;
        if (client && client.id) {
          this.petService.getPetsByClientId(client.id).subscribe({
            next: (pets) => {
              this.pets = pets;
            },
            error: (err) => {
              console.error(
                `Error buscando mascotas para el cliente ${client.id}:`,
                err
              ); 
              this.pets = [];
            },
          });
        } else {
          console.error(
            'El cliente no tiene un ID válido para buscar mascotas.'
          );
          this.pets = [];
        }      },
      error: (err) => {
        this.client = null;
        this.pets = [];
      },
    });
  }
  /**
   * Logs the user out and redirects to the home page
   */
  logout(): void {
    console.log('Logout process initiated');
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
        // Even if there's an error, navigate to home
        this.router.navigate(['/']);
      }
    });
  }
  /**
   * Initialize Lucide icons after the view is rendered
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      // Try first with global lucide variable
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
        console.log('Lucide icons initialized via global variable');
      } else {
        // Alternative: manually load Lucide script if not already available
        this.loadLucideScript();
      }
    });
  }
    /**
   * Dynamically load the Lucide script if not already available
   */
  private loadLucideScript(): void {
    // Check if script is already loaded
    if (this.document.getElementById('lucide-script')) {
      return;
    }
    
    // Create script element
    const script = this.renderer.createElement('script');
    script.id = 'lucide-script';
    script.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
    script.onload = () => {
      if (typeof lucide !== 'undefined') {
        console.log('Lucide script loaded dynamically');
        lucide.createIcons();
      }
    };
    
    // Append to head
    this.renderer.appendChild(this.document.head, script);
  }

  /**
   * Load active veterinarians
   */
  private loadVeterinarians(): void {
    this.vetService.getAllVets().subscribe({
      next: (vets) => {
        this.veterinarians = vets.filter(vet => vet.estado);
      },
      error: (err) => {
        console.error('Error loading veterinarians:', err);
        this.veterinarians = [];
      }
    });
  }

  /**
   * Open appointment modal
   */
  openAppointmentModal(): void {
    this.showAppointmentModal = true;
    this.resetAppointmentForm();
  }

  /**
   * Close appointment modal
   */
  closeAppointmentModal(): void {
    this.showAppointmentModal = false;
    this.resetAppointmentForm();
  }

  /**
   * Reset appointment form
   */
  private resetAppointmentForm(): void {
    this.selectedPetId = null;
    this.selectedVetId = null;
    this.selectedDate = '';
    this.selectedTime = '';
    this.availableTimeSlots = [];
    this.appointmentForm = {
      isValid: false,
      errors: {
        pet: '',
        vet: '',
        date: '',
        time: ''
      }
    };
  }

  /**
   * Handle date change - update available time slots
   */
  onDateChange(): void {
    if (this.selectedVetId && this.selectedDate) {
      const date = new Date(this.selectedDate);
      this.availableTimeSlots = this.appointmentService.getAvailableTimeSlots(this.selectedVetId, date);
      this.selectedTime = ''; // Reset selected time
    }
    this.validateForm();
  }

  /**
   * Handle veterinarian change
   */
  onVetChange(): void {
    if (this.selectedVetId && this.selectedDate) {
      const date = new Date(this.selectedDate);
      this.availableTimeSlots = this.appointmentService.getAvailableTimeSlots(this.selectedVetId, date);
      this.selectedTime = ''; // Reset selected time
    }
    this.validateForm();
  }
  /**
   * Validate appointment form
   */
  validateForm(): void {
    this.appointmentForm.errors = {
      pet: '',
      vet: '',
      date: '',
      time: ''
    };

    // Validate pet selection
    if (!this.selectedPetId) {
      this.appointmentForm.errors.pet = 'Debe seleccionar una mascota';
    }

    // Validate vet selection
    if (!this.selectedVetId) {
      this.appointmentForm.errors.vet = 'Debe seleccionar un veterinario';
    }

    // Validate date
    if (!this.selectedDate) {
      this.appointmentForm.errors.date = 'Debe seleccionar una fecha';
    } else {
      const selectedDate = new Date(this.selectedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        this.appointmentForm.errors.date = 'La fecha no puede ser anterior a hoy';
      }
    }

    // Validate time
    if (!this.selectedTime) {
      this.appointmentForm.errors.time = 'Debe seleccionar una hora';
    }

    // Check if form is valid
    this.appointmentForm.isValid = 
      !this.appointmentForm.errors.pet &&
      !this.appointmentForm.errors.vet &&
      !this.appointmentForm.errors.date &&
      !this.appointmentForm.errors.time;
  }  /**
   * Save appointment
   */
  saveAppointment(): void {
    this.validateForm();
    
    if (!this.appointmentForm.isValid) {
      return;
    }

    const selectedPet = this.pets.find(pet => pet.id == this.selectedPetId); // Use == for loose comparison
    const selectedVet = this.veterinarians.find(vet => vet.id == this.selectedVetId); // Use == for loose comparison

    if (!selectedPet || !selectedVet || !this.client) {
      console.error('Missing required data for appointment');
      return;
    }

    const appointment = new Cita({
      mascotaId: Number(this.selectedPetId!),
      mascotaNombre: selectedPet.nombre,
      veterinarioId: Number(this.selectedVetId!),
      veterinarioNombre: selectedVet.nombre,
      clienteEmail: this.client.correo,
      clienteNombre: this.client.nombre,
      fecha: new Date(this.selectedDate),
      hora: this.selectedTime,
      estado: true
    });

    try {
      this.appointmentService.saveAppointment(appointment);
      alert('Cita programada exitosamente');
      this.closeAppointmentModal();
    } catch (error: any) {
      if (error.message && error.message.includes('Ya existe una cita')) {
        alert('Ya existe una cita para este veterinario en esa fecha y hora. Por favor, elige otro horario.');
      } else {
        alert('Error al programar la cita. Intente nuevamente.');
      }
    }
  }

  /**
   * Get minimum date for date input (today)
   */
  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
