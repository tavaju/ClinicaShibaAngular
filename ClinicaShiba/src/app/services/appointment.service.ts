import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cita } from '../model/cita';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly STORAGE_KEY = 'clinic_appointments';
  private appointmentsSubject = new BehaviorSubject<Cita[]>([]);
  public appointments$ = this.appointmentsSubject.asObservable();

  constructor() {
    this.loadAppointments();
    this.removeExpiredAppointments();
  }

  /**
   * Load appointments from localStorage
   */
  private loadAppointments(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const appointments = JSON.parse(stored).map((data: any) => new Cita({
          ...data,
          fecha: new Date(data.fecha)
        }));
        this.appointmentsSubject.next(appointments);
      }
    } catch (error) {
      console.error('Error loading appointments from localStorage:', error);
      this.appointmentsSubject.next([]);
    }
  }

  /**
   * Save appointments to localStorage
   */
  private saveToStorage(appointments: Cita[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(appointments));
      this.appointmentsSubject.next(appointments);
    } catch (error) {
      console.error('Error saving appointments to localStorage:', error);
    }
  }

  /**
   * Get all appointments
   */
  getAllAppointments(): Cita[] {
    return this.appointmentsSubject.getValue();
  }

  /**
   * Get appointments for a specific veterinarian
   */
  getAppointmentsByVet(veterinarioId: number): Cita[] {
    return this.getAllAppointments()
      .filter(appointment => 
        appointment.veterinarioId === veterinarioId && 
        appointment.estado
      );
  }

  /**
   * Get appointments for a specific client
   */
  getAppointmentsByClient(clienteEmail: string): Cita[] {
    return this.getAllAppointments()
      .filter(appointment => 
        appointment.clienteEmail === clienteEmail && 
        appointment.estado
      );
  }  /**
   * Save new appointment
   */
  saveAppointment(appointment: Cita): void {
    const appointments = this.getAllAppointments();
    appointments.push(appointment);
    this.saveToStorage(appointments);
  }

  /**
   * Update appointment status
   */
  updateAppointmentStatus(appointmentId: string, estado: boolean): void {
    const appointments = this.getAllAppointments();
    const index = appointments.findIndex(apt => apt.id === appointmentId);
    
    if (index !== -1) {
      appointments[index].estado = estado;
      this.saveToStorage(appointments);
    }
  }

  /**
   * Remove expired appointments automatically
   */
  removeExpiredAppointments(): void {
    const appointments = this.getAllAppointments();
    const activeAppointments = appointments.filter(appointment => 
      !appointment.isExpired() || !appointment.estado
    );
    
    // Only update if there were expired appointments
    if (activeAppointments.length !== appointments.length) {
      this.saveToStorage(activeAppointments);
    }
  }

  /**
   * Check if appointment time is available for a veterinarian
   */
  isTimeAvailable(veterinarioId: number, fecha: Date, hora: string): boolean {
    const appointments = this.getAppointmentsByVet(veterinarioId);
    
    return !appointments.some(appointment => {
      const appointmentDate = new Date(appointment.fecha);
      return appointmentDate.toDateString() === fecha.toDateString() && 
             appointment.hora === hora;
    });
  }

  /**
   * Get available time slots for a specific date and veterinarian
   */
  getAvailableTimeSlots(veterinarioId: number, fecha: Date): string[] {
    const allTimeSlots = [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
      '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00'
    ];

    return allTimeSlots.filter(time => 
      this.isTimeAvailable(veterinarioId, fecha, time)
    );
  }
}
