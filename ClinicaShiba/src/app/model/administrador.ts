import { Veterinario } from './veterinario';

export class Administrador {
  // Clave primaria autogenerada
  id?: number;

  // Atributos obligatorios
  cedula!: string;
  nombre!: string;
  contrasena!: string;

  // Relación uno a muchos con Veterinario (puede estar vacía)
  veterinarios?: Veterinario[];

  constructor(
    cedula: string,
    nombre: string,
    contrasena: string,
    veterinarios?: Veterinario[],
    id?: number
  ) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.contrasena = contrasena;

    if (veterinarios) this.veterinarios = veterinarios;
    if (id !== undefined) this.id = id;
  }
}
