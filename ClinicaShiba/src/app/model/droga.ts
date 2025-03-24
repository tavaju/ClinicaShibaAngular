import { Tratamiento } from './tratamiento';

export class Droga {
  // Clave primaria autogenerada
  id?: number;

  // Atributos obligatorios
  nombre!: string;
  precioCompra!: number;
  precioVenta!: number;
  unidadesDisponibles!: number;
  unidadesVendidas!: number;

  // Relación con Tratamiento (obligatoria)
  tratamiento!: Tratamiento;

  constructor(
    nombre: string,
    precioCompra: number,
    precioVenta: number,
    unidadesDisponibles: number,
    unidadesVendidas: number,
    tratamiento: Tratamiento,
    id?: number // opcional
  ) {
    this.nombre = nombre;
    this.precioCompra = precioCompra;
    this.precioVenta = precioVenta;
    this.unidadesDisponibles = unidadesDisponibles;
    this.unidadesVendidas = unidadesVendidas;
    this.tratamiento = tratamiento;
    if (id !== undefined) this.id = id;
  }
}
