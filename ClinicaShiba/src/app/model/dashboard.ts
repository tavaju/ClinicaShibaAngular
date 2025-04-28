export interface TratamientoPorMedicamento {
  nombreMedicamento: string;
  cantidad: number;
}

export interface TopTratamiento {
  nombreMedicamento: string;
  unidadesVendidas: number;
}

export interface DashboardData {
  totalTratamientosUltimoMes: number;
  ventasTotales: number;
  gananciasTotales: number;
  mascotasTotales: number;
  mascotasActivas: number;
  veterinariosActivos: number;
  veterinariosInactivos: number;
  tratamientosPorMedicamento: TratamientoPorMedicamento[];
  topTratamientos: TopTratamiento[];
} 