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
  numAtenciones?: number; // Now optional as it's calculated by the backend
  contrasena!: string;

  // Atributo opcional
  foto?: string;

  // Relaciones
  administrador?: Administrador;
  mascotas?: Mascota[]; // Relación muchos a muchos
  tratamientos?: Tratamiento[]; // Relación uno a muchos

  // Estado del veterinario
  estado: boolean = true; // Default to true (active)

  constructor(
    cedula: string,
    nombre: string,
    especialidad: string,
    contrasena: string,
    administrador?: Administrador, // Make administrador optional
    foto?: string,
    mascotas?: Mascota[],
    tratamientos?: Tratamiento[],
    id?: number,
    estado: boolean = true,
    numAtenciones?: number // Make numAtenciones optional and move to the end
  ) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.especialidad = especialidad;
    this.contrasena = contrasena;
    this.administrador = administrador; // Assign optional administrador

    if (foto) this.foto = foto;
    if (mascotas) this.mascotas = mascotas;
    if (tratamientos) this.tratamientos = tratamientos;
    if (id !== undefined) this.id = id;
    if (numAtenciones !== undefined) this.numAtenciones = numAtenciones;
    this.estado = estado;
  }

  getEstadoTexto(): string {
    return this.estado ? 'Activo' : 'Inactivo';
  }
}
