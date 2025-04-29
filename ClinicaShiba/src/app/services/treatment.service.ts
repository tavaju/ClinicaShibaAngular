import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Droga } from '../model/droga';
import { Tratamiento } from '../model/tratamiento';
import { Mascota } from '../model/mascota';

@Injectable({
  providedIn: 'root',
})
export class TreatmentService {
  private baseUrl = 'http://localhost:8090/droga'; 
  private mascotaUrl = 'http://localhost:8090/mascota';
  private veterinarioUrl = 'http://localhost:8090/veterinario';

  constructor(private http: HttpClient) {}

  getAvailableDrugs(): Observable<Droga[]> {
    return this.http.get<Droga[]>(`${this.baseUrl}/disponibles`);
  }

  createTreatment(
    mascotaId: number,
    veterinarioId: number,
    drogaId: number
  ): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(
      `${this.mascotaUrl}/darTratamiento/${mascotaId}`, 
      null,
      {
        params: {
          veterinarioId: veterinarioId.toString(),
          drogaId: drogaId.toString(),
        },
      }
    );
  }

  // Get all pets treated by a specific veterinarian
  getPetsByVeterinarioId(veterinarioId: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.veterinarioUrl}/findByVeterinarioId?veterinarioId=${veterinarioId}`).pipe(
      catchError(error => {
        console.error(`Error obteniendo mascotas tratadas por veterinario ID ${veterinarioId}:`, error);
        throw new Error(`No se pudieron cargar las mascotas tratadas por el veterinario.`);
      })
    );
  }

  // Verificar si una mascota ya tiene tratamiento usando el nuevo endpoint
  hasPetReceivedTreatment(petId: number): Observable<boolean> {
    console.log(`Verificando tratamientos para mascota ID: ${petId}`);
    // Utilizamos el nuevo endpoint específico para verificar tratamientos
    return this.http.get<boolean>(`${this.mascotaUrl}/hasTratamiento/${petId}`).pipe(
      map(hasTreatment => {
        console.log(`Respuesta para mascota ${petId}:`, hasTreatment);
        return hasTreatment;
      }),
      catchError(error => {
        console.error(`Error verificando tratamientos para mascota ID ${petId}:`, error);
        // En caso de error, devolvemos false para evitar bloquear el botón por error
        return new Observable<boolean>(observer => {
          observer.next(false);
          observer.complete();
        });
      })
    );
  }
}
