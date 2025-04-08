import { Mascota } from './mascota';

export class Cliente {
  /** Clave primaria autogenerada */
  id?: number;

  /** Obligatorio */
  cedula?: string;

  /** Obligatorio */
  nombre?: string;

  /** Obligatorio, debe tener formato de correo */
  correo?: string;

  /** Obligatorio */
  celular?: string;

  /** Obligatorio */
  contrasena?: string;

  /** Lista de mascotas del cliente */
  mascotas?: Mascota[];

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.cedula = data.cedula;
      this.nombre = data.nombre;
      this.correo = data.correo;
      this.celular = data.celular;
      this.contrasena = data.contrasena;
      this.mascotas = data.mascotas || [];
    }
  }
}
