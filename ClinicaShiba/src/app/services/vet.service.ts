import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Veterinario } from '../model/veterinario';
import { Mascota } from '../model/mascota';

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

  // Fetch a veterinarian by cédula
  getVetByCedula(cedula: string): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.baseUrl}/find/cedula/${cedula}`).pipe(
      map(vet => {
        if (!vet) {
          throw new Error(`No se encontró veterinario con cédula: ${cedula}`);
        }
        return vet;
      }),
      catchError(error => {
        console.error(`Error buscando veterinario con cédula ${cedula}:`, error);
        throw new Error(`No se encontró veterinario con cédula: ${cedula}`);
      })
    );
  }

  // Get all pets treated by a veterinarian
  getPetsByVeterinarioId(veterinarioId: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}/findByVeterinarioId?veterinarioId=${veterinarioId}`).pipe(
      catchError(error => {
        console.error(`Error obteniendo mascotas tratadas por veterinario ID ${veterinarioId}:`, error);
        throw new Error(`No se pudieron cargar las mascotas tratadas por el veterinario.`);
      })
    );
  }

  // Authenticate a veterinarian with cédula and password
  authenticateVet(cedula: string, password: string): Observable<Veterinario> {
    return this.getAllVets().pipe(
      map(vets => {
        const matchingVet = vets.find(
          vet => vet.cedula === cedula && vet.contrasena === password
        );

        if (!matchingVet) {
          throw new Error('Cédula o contraseña incorrectos');
        }

        return matchingVet;
      })
    );
  }

  // Add a new veterinarian
  addVet(vet: Veterinario, confirmPassword: string, administradorId: number): Observable<void> {
    // Create proper parameters including both confirmPassword and administradorId
    const params: any = { 
      confirmPassword,
      administradorId
    };

    console.log('Sending request to backend with params:', params);

    return this.http.post<void>(
      `${this.baseUrl}/add`,
      vet,
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

  // Check if a cedula already exists
  checkCedulaExists(cedula: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-cedula/${cedula}`);
  }
}