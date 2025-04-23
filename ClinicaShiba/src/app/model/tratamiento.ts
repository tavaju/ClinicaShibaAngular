import { Mascota } from './mascota';
import { Veterinario } from './veterinario';
import { Droga } from './droga';

export class Tratamiento {
  // Clave primaria autogenerada
  id?: number;

  // Atributo obligatorio
  fecha!: Date;

  // Relaciones
  droga: Droga; // Relación 1 a 1
  mascota!: Mascota; // Obligatorio
  veterinario!: Veterinario; // Obligatorio

  constructor(
    fecha: Date,
    mascota: Mascota,
    veterinario: Veterinario,
    droga: Droga,
    id?: number
  ) {
    this.fecha = fecha;
    this.mascota = mascota;
    this.veterinario = veterinario;
    this.droga = droga;
    if (id !== undefined) this.id = id;
  }

  static create(
    fecha: Date,
    mascota: Mascota,
    veterinario: Veterinario,
    droga: Droga
  ): Tratamiento {
    return new Tratamiento(fecha, mascota, veterinario, droga);
  }
}
