export class Cita {
  id: string;
  mascotaId: number;
  mascotaNombre: string;
  veterinarioId: number;
  veterinarioNombre: string;
  clienteEmail: string;
  clienteNombre: string;
  fecha: Date;
  hora: string;
  estado: boolean; // true = activa, false = inactiva

  constructor(data: Partial<Cita> = {}) {
    this.id = data.id || this.generateId();
    this.mascotaId = data.mascotaId || 0;
    this.mascotaNombre = data.mascotaNombre || '';
    this.veterinarioId = data.veterinarioId || 0;
    this.veterinarioNombre = data.veterinarioNombre || '';
    this.clienteEmail = data.clienteEmail || '';
    this.clienteNombre = data.clienteNombre || '';
    this.fecha = data.fecha || new Date();
    this.hora = data.hora || '';
    this.estado = data.estado !== undefined ? data.estado : true;
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  isExpired(): boolean {
    const now = new Date();
    const appointmentDateTime = new Date(this.fecha);
    const [hours, minutes] = this.hora.split(':').map(Number);
    appointmentDateTime.setHours(hours, minutes);
    
    return appointmentDateTime < now;
  }
}
