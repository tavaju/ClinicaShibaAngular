import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Mascota } from '../model/mascota';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private baseUrl = 'http://localhost:8090/mascota';
  private petsSubject = new BehaviorSubject<Mascota[]>([]);

  constructor(private http: HttpClient) {}

  // Obtener todas las mascotas
  getPets(): Observable<Mascota[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(
      map((data) => data.map(item => new Mascota({
        ...item,
        cliente: { cedula: item.cedulaCliente }  // Mapea la cédula manualmente
      })))
    );
  }  

  // Obtener una mascota por ID
  getPetById(id: number): Mascota | undefined {
    const pets = this.petsSubject.getValue();
    return pets.find(pet => pet.id === id);
  }

  // Obtener una mascota por ID desde el backend (versión alternativa con Observable)
  getPetByIdFromApi(id: number): Observable<Mascota> {
    return this.http.get<any>(`${this.baseUrl}/find?id=${id}`).pipe(
      map((data) => new Mascota(data))  // Convertimos el objeto plano en una instancia de la clase Mascota
    );
  }

  addPet(pet: Mascota, idCliente: number | string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add?idCliente=${idCliente}`, pet);
  }
  
  updatePet(pet: Mascota, idCliente: number): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.baseUrl}/update/${pet.id}?idCliente=${idCliente}`, pet);
  }
  
  

  // Buscar mascotas localmente
  searchPets(query: string): Mascota[] {
    const currentPets = this.petsSubject.getValue();
    return currentPets.filter(pet =>
      pet.nombre?.toLowerCase().includes(query.toLowerCase()) ||
      pet.raza?.toLowerCase().includes(query.toLowerCase())
    );
  }
}
