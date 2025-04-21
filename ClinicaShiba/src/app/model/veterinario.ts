import { Administrador } from './administrador';
import { Mascota } from './mascota';
import { Tratamiento } from './tratamiento';

export class Veterinario {
  // Clave primaria autogenerada
  id?: number;

  // Atributos obligatorios
  cedula!: string;
  nombre!: string;
  especialidad!: string;
  numAtenciones!: number;
  contrasena!: string;

  // Atributo opcional
  foto?: string;

  // Relaciones
  administrador?: Administrador; 
  mascotas?: Mascota[]; // Relación muchos a muchos
  tratamientos?: Tratamiento[]; // Relación uno a muchos

  constructor(
    cedula: string,
    nombre: string,
    especialidad: string,
    numAtenciones: number,
    contrasena: string,
    administrador: Administrador,
    foto?: string,
    mascotas?: Mascota[],
    tratamientos?: Tratamiento[],
    id?: number
  ) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.especialidad = especialidad;
    this.numAtenciones = numAtenciones;
    this.contrasena = contrasena;
    this.administrador = administrador;

    if (foto) this.foto = foto;
    if (mascotas) this.mascotas = mascotas;
    if (tratamientos) this.tratamientos = tratamientos;
    if (id !== undefined) this.id = id;
  }
}
