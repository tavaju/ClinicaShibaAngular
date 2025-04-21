import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veterinario } from '../model/veterinario';

@Injectable({
  providedIn: 'root',
})
export class VetService {
  private baseUrl = 'http://localhost:8090/veterinario';

  constructor(private http: HttpClient) {}

  // Fetch all veterinarians
  getAllVets(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.baseUrl}/all`);
  }

  // Fetch a veterinarian by ID
  getVetById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.baseUrl}/find/${id}`);
  }

  // Add a new veterinarian
  addVet(vet: Veterinario, confirmPassword: string): Observable<void> {
    const params = { confirmPassword };
    return this.http.post<void>(
      `${this.baseUrl}/add`,
      { ...vet, estado: vet.estado },
      { params }
    );
  }

  // Update an existing veterinarian
  updateVet(
    id: number,
    vet: Veterinario,
    changePassword: boolean,
    newPassword?: string,
    confirmPassword?: string
  ): Observable<void> {
    const params: any = {
      changePassword,
      newPassword,
      confirmPassword,
      especialidad: vet.especialidad,
      foto: vet.foto,
      numAtenciones: vet.numAtenciones,
      cedula: vet.cedula, // Ensure cedula is included
      nombre: vet.nombre, // Ensure nombre is included
      estado: vet.estado, // Include estado
    };
    return this.http.post<void>(`${this.baseUrl}/update/${id}`, vet, {
      params,
    });
  }

  // Delete a veterinarian by ID
  deleteVet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
