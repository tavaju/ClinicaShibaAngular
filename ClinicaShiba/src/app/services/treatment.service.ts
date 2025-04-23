import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Droga } from '../model/droga';
import { Tratamiento } from '../model/tratamiento';

@Injectable({
  providedIn: 'root',
})
export class TreatmentService {
  private baseUrl = 'http://localhost:8090/droga'; 

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
      `http://localhost:8090/mascota/darTratamiento/${mascotaId}`, 
      null,
      {
        params: {
          veterinarioId: veterinarioId.toString(),
          drogaId: drogaId.toString(),
        },
      }
    );
  }
}
