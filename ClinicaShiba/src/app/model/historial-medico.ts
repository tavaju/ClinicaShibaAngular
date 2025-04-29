export interface HistorialMedico {
  id: number;               // ID del tratamiento
  fecha: Date;              // Fecha del tratamiento
  nombreMascota: string;    // Nombre de la mascota
  nombreCliente: string;    // Nombre del cliente/dueño
  nombreVeterinario: string;        // Nombre del veterinario
  especialidadVeterinario: string;  // Especialidad del veterinario
  nombreDroga: string;      // Nombre del medicamento
}