import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { Mascota } from '../model/mascota';
import { Cliente } from '../model/cliente';
import { HistorialMedico } from '../model/historial-medico';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private baseUrl = 'http://localhost:8090/mascota';
  private clienteUrl = 'http://localhost:8090/cliente';
  private petsSubject = new BehaviorSubject<Mascota[]>([]);

  constructor(private http: HttpClient) {}

  // Obtener todas las mascotas
  getPets(): Observable<Mascota[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(
      map((data) =>
        data.map(
          (item) =>
            new Mascota({
              ...item,
              cliente: { cedula: item.cedulaCliente }, // Mapea la cédula manualmente
            })
        )
      )
    );
  }

  // Obtener una mascota por ID
  getPetById(id: number): Mascota | undefined {
    const pets = this.petsSubject.getValue();
    return pets.find((pet) => pet.id === id);
  }

  // Obtener una mascota por ID desde el backend (versión optimizada)
  getPetByIdFromApi(id: number): Observable<Mascota> {
    return this.http.get<any>(`${this.baseUrl}/find?id=${id}`).pipe(
      map((data) => {
        const mascota = new Mascota(data);
        // Solo almacenamos la cédula del cliente, no todo el objeto cliente
        if (data.cedulaCliente) {
          mascota.cliente = { cedula: data.cedulaCliente } as Cliente;
        }
        return mascota;
      })
    );
  }

  // Nuevo método para obtener los datos del cliente por cédula
  getClienteByCedula(cedula: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.clienteUrl}/find?cedula=${cedula}`);
  }

  // Add a new pet with client cedula
  addPet(pet: Mascota, cedula: string): Observable<Mascota> {
    // Match the parameter name 'cedula' as used in the controller
    return this.http.post<Mascota>(
      `${this.baseUrl}/add?cedula=${encodeURIComponent(cedula)}`,
      pet
    );
  }

  // Update pet
  updatePet(pet: Mascota, cedula?: string): Observable<Mascota> {
    const url = cedula
      ? `${this.baseUrl}/update/${pet.id}?cedula=${encodeURIComponent(cedula)}`
      : `${this.baseUrl}/update/${pet.id}`;

    return this.http.put<Mascota>(url, pet);
  }

  deletePet(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update/${id}?estado=false`, {}); // Aquí usamos PUT para actualizar el estado
  }

  deactivatePet(id: number): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.baseUrl}/deactivate/${id}`, {}); // Llamada PUT para desactivar la mascota
  }

  // Buscar mascotas localmente
  searchPets(query: string): Mascota[] {
    const currentPets = this.petsSubject.getValue();
    return currentPets.filter(
      (pet) =>
        pet.nombre?.toLowerCase().includes(query.toLowerCase()) ||
        pet.raza?.toLowerCase().includes(query.toLowerCase())
    );
  }

  getPetsByClientId(clientId: number): Observable<Mascota[]> {
    return this.http
      .get<Mascota[]>(`${this.baseUrl}/findByClientId?clientId=${clientId}`)
      .pipe(
        map((pets) => {
          console.log('Respuesta del servidor para getPetsByClientId:', pets); // Debug log
          return pets;
        }),
        catchError((error) => {
          console.error(
            `Error buscando mascotas para el cliente ${clientId}:`,
            error
          ); // Error log
          throw error;
        })
      );
  }

  //buscar todas las drogas en /tratamiento
  getAllDrugs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tratamiento`).pipe(
      map((data) => data),
      catchError((error) => {
        console.error('Error fetching drugs:', error);
        throw error;
      })
    );
  }

  // Obtener el historial médico de una mascota
  getHistorialMedico(mascotaId: number): Observable<HistorialMedico[]> {
    return this.http
      .get<HistorialMedico[]>(`${this.baseUrl}/historial-medico/${mascotaId}`)
      .pipe(
        map((historial) => {
          console.log('Historial médico obtenido:', historial);
          // Convertir el string de fecha a objeto Date
          return historial.map((item) => ({
            ...item,
            fecha: new Date(item.fecha),
          }));
        }),
        catchError((error) => {
          console.error(
            `Error al obtener historial médico para la mascota ${mascotaId}:`,
            error
          );
          throw error;
        })
      );
  }

  // Fetch the estado of a Mascota by ID
  getMascotaEstado(mascotaId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/estado/${mascotaId}`);
  }
}
