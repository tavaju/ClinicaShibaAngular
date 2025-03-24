import { Mascota } from './mascota';
import { Veterinario } from './veterinario';
import { Droga } from './droga';

export class Tratamiento {
  // Clave primaria autogenerada
  id?: number;

  // Atributo obligatorio
  fecha!: Date;

  // Relaciones
  drogas?: Droga[]; // Puede ser una lista vacía o no estar cargada aún
  mascota!: Mascota; // Obligatorio
  veterinario!: Veterinario; // Obligatorio

  constructor(
    fecha: Date,
    mascota: Mascota,
    veterinario: Veterinario,
    drogas?: Droga[],
    id?: number
  ) {
    this.fecha = fecha;
    this.mascota = mascota;
    this.veterinario = veterinario;
    if (drogas) this.drogas = drogas;
    if (id !== undefined) this.id = id;
  }
}
