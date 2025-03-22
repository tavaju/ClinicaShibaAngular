// src/app/models/mascota.model.ts

import { Cliente } from './cliente';

export class Mascota {
  /** Clave primaria autogenerada */
  id?: number;

  /** Obligatorio */
  nombre: string;

  /** Obligatorio */
  raza: string;

  /** Obligatorio, número positivo */
  edad: number;

  /** Obligatorio, número positivo */
  peso: number;

  /** Puede ser nulo */
  enfermedad?: string;

  /** Puede ser nulo (URL) */
  foto?: string;

  /** Obligatorio */
  estado: boolean;

  /** Relación muchos a uno con Cliente */
  cliente?: Cliente;

  constructor(data: Partial<Mascota> = {}) {
    this.id = data.id;
    this.nombre = data.nombre || '';
    this.raza = data.raza || '';
    this.edad = data.edad || 0;
    this.peso = data.peso || 0;
    this.enfermedad = data.enfermedad;
    this.foto = data.foto;
    this.estado = data.estado ?? true;
    this.cliente = data.cliente;
  }

  /** Devuelve "Activo" o "Inactivo" */
  getEstadoTexto(): string {
    return this.estado ? 'Activo' : 'Inactivo';
  }

  /** Devuelve la cédula del cliente si existe */
  getCedulaCliente(): string | null {
    return this.cliente?.cedula ?? null;
  }
}
