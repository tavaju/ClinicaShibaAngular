import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardData, TratamientoPorMedicamento, TopTratamiento } from '../model/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8090/dashboard';

  constructor(private http: HttpClient) { }

  // Get all dashboard data in a single call
  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(this.apiUrl);
  }

  // Individual endpoints for specific data
  getTratamientosTotales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/tratamientos-totales`);
  }

  getTratamientosPorMedicamento(): Observable<TratamientoPorMedicamento[]> {
    return this.http.get<TratamientoPorMedicamento[]>(`${this.apiUrl}/tratamientos-por-medicamento`);
  }

  getTopTratamientos(): Observable<TopTratamiento[]> {
    return this.http.get<TopTratamiento[]>(`${this.apiUrl}/top-tratamientos`);
  }

  getVeterinariosActivos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/veterinarios-activos`);
  }

  getVeterinariosInactivos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/veterinarios-inactivos`);
  }

  getMascotasTotales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/mascotas-totales`);
  }

  getMascotasActivas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/mascotas-activas`);
  }

  getVentasTotales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ventas-totales`);
  }

  getGananciasTotales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ganancias-totales`);
  }
} 