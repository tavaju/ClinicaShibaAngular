import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ChartThemeColors {
  // Medicamentos Chart (Bar)
  medicamentosChartColor: string;
  medicamentosChartBg: string;
  medicamentosChartBorder: string;

  // Top Tratamientos Chart (Pie)
  topTratamientosColors: string[];
  topTratamientosBorders: string[];

  // Veterinarios Chart (Doughnut)
  veterinariosChartActive: string;
  veterinariosChartInactive: string;
  veterinariosChartActiveBorder: string;
  veterinariosChartInactiveBorder: string;

  // Mascotas Chart (Doughnut)
  mascotasChartActive: string;
  mascotasChartInactive: string;
  mascotasChartActiveBorder: string;
  mascotasChartInactiveBorder: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChartThemeService {
  // Default chart theme
  private defaultTheme: ChartThemeColors = {
    // Medicamentos Chart (Bar)
    medicamentosChartColor: '#53a69c',
    medicamentosChartBg: 'rgba(83, 166, 156, 0.8)',
    medicamentosChartBorder: 'rgba(83, 166, 156, 1)',

    // Top Tratamientos Chart (Pie)
    topTratamientosColors: [
      'rgba(83, 166, 156, 0.8)',
      'rgba(255, 183, 77, 0.8)',
      'rgba(126, 87, 194, 0.8)'
    ],
    topTratamientosBorders: [
      'rgba(83, 166, 156, 1)',
      'rgba(255, 183, 77, 1)',
      'rgba(126, 87, 194, 1)'
    ],

    // Veterinarios Chart (Doughnut)
    veterinariosChartActive: 'rgba(83, 166, 156, 0.8)',
    veterinariosChartInactive: 'rgba(239, 83, 80, 0.8)',
    veterinariosChartActiveBorder: 'rgba(83, 166, 156, 1)',
    veterinariosChartInactiveBorder: 'rgba(239, 83, 80, 1)',

    // Mascotas Chart (Doughnut)
    mascotasChartActive: 'rgba(83, 166, 156, 0.8)',
    mascotasChartInactive: 'rgba(239, 83, 80, 0.8)',
    mascotasChartActiveBorder: 'rgba(83, 166, 156, 1)',
    mascotasChartInactiveBorder: 'rgba(239, 83, 80, 1)'
  };

  // BehaviorSubject to track theme changes
  private chartThemeSource = new BehaviorSubject<ChartThemeColors>(this.defaultTheme);
  
  // Observable that components can subscribe to
  chartTheme$ = this.chartThemeSource.asObservable();

  constructor() { }

  // Get current chart theme
  getCurrentTheme(): ChartThemeColors {
    return this.chartThemeSource.getValue();
  }

  // Set a completely new theme
  setChartTheme(theme: ChartThemeColors): void {
    this.chartThemeSource.next(theme);
  }

  // Reset theme to default
  resetToDefaultTheme(): void {
    this.chartThemeSource.next(this.defaultTheme);
  }

  // Update specific chart colors
  updateMedicamentosColors(color: string, bg: string, border: string): void {
    const currentTheme = this.getCurrentTheme();
    this.chartThemeSource.next({
      ...currentTheme,
      medicamentosChartColor: color,
      medicamentosChartBg: bg,
      medicamentosChartBorder: border
    });
  }

  updateTopTratamientosColors(colors: string[], borders: string[]): void {
    const currentTheme = this.getCurrentTheme();
    this.chartThemeSource.next({
      ...currentTheme,
      topTratamientosColors: colors,
      topTratamientosBorders: borders
    });
  }

  updateVeterinariosColors(
    active: string, 
    inactive: string, 
    activeBorder: string,
    inactiveBorder: string
  ): void {
    const currentTheme = this.getCurrentTheme();
    this.chartThemeSource.next({
      ...currentTheme,
      veterinariosChartActive: active,
      veterinariosChartInactive: inactive,
      veterinariosChartActiveBorder: activeBorder,
      veterinariosChartInactiveBorder: inactiveBorder
    });
  }

  updateMascotasColors(
    active: string, 
    inactive: string, 
    activeBorder: string,
    inactiveBorder: string
  ): void {
    const currentTheme = this.getCurrentTheme();
    this.chartThemeSource.next({
      ...currentTheme,
      mascotasChartActive: active,
      mascotasChartInactive: inactive,
      mascotasChartActiveBorder: activeBorder,
      mascotasChartInactiveBorder: inactiveBorder
    });
  }
} 