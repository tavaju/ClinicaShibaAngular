import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mascota } from '../model/mascota';
import { Cliente } from '../model/cliente';
import { HttpClient } from '@angular/common/http';

// Create an interface that extends Mascota but includes cedulaCliente
interface MascotaFormData extends Partial<Mascota> {
  cedulaCliente?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PetService {
  

  //private pets = new BehaviorSubject<Mascota[]>(this.mockPets);
  // Define the property as possibly undefined to fix the TypeScript error
  //private broadcastChannel?: BroadcastChannel;

  constructor(private http: HttpClient) {

    
    // Initialize the BroadcastChannel for cross-tab communication
    //this.initBroadcastChannel();
  }

  findAll(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>('http://localhost:8090/mascota/all');
  }
  findById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`http://localhost:8090/mascota/find/${id}`);
  }
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8090/mascota/delete/?id=${id}`);
  }
  addPet(pet: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>('http://localhost:8090/mascota/save', pet);
  }
  updatePet(pet: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>('http://localhost:8090/mascota/update', pet);
  }
  searchPets(query: string): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`http://localhost:8090/mascota/search?query=${query}`);
  }


  /*
  private initBroadcastChannel(): void {
    try {
      this.broadcastChannel = new BroadcastChannel('pets_data_channel');
      
      // Listen for messages from other tabs
      this.broadcastChannel.onmessage = (event) => {
        if (event.data && event.data.type) {
          switch(event.data.type) {
            case 'UPDATE_PETS':
              // Update the local data without broadcasting again
              this.updateLocalPets(event.data.pets);
              break;
          }
        }
      };
    } catch (error) {
      console.error('BroadcastChannel not supported in this browser', error);
    }
  }

  private updateLocalPets(petsData: any[]): void {
    // Convert raw data back to Mascota objects
    this.mockPets = petsData.map(petData => {
      const pet = new Mascota(petData);
      if (petData.cliente) {
        pet.cliente = new Cliente(petData.cliente);
      }
      return pet;
    });
    
    // Update the BehaviorSubject without broadcasting
    this.pets.next(this.mockPets);
  }

  private broadcastUpdate(): void {
    // Check if broadcastChannel exists before using it
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({
          type: 'UPDATE_PETS',
          pets: this.mockPets
        });
      } catch (error) {
        console.error('Failed to broadcast update', error);
      }
    }
  }

  getPets(): Observable<Mascota[]> {
    return this.pets.asObservable();
  }

  getPetById(id: number): Mascota | undefined {
    return this.mockPets.find(pet => pet.id === id);
  }

  addPet(petData: MascotaFormData): void {
    const newPet = new Mascota(petData);
    newPet.id = Math.max(...this.mockPets.map(p => p.id || 0), 0) + 1;
    
    // Create a simple Cliente object if cedulaCliente is provided
    if (petData.cedulaCliente) {
      newPet.cliente = new Cliente({
        id: newPet.id, // Use the same ID for simplicity
        cedula: petData.cedulaCliente,
        nombre: 'Cliente ' + petData.cedulaCliente,
        correo: `cliente${petData.cedulaCliente}@example.com`,
        celular: '0000000000',
        contrasena: 'password'
      });
    }
    
    this.mockPets.push(newPet);
    this.pets.next([...this.mockPets]);
    
    // Broadcast the change to other tabs
    this.broadcastUpdate();
  }

  updatePet(updatedPetData: MascotaFormData): void {
    const index = this.mockPets.findIndex(pet => pet.id === updatedPetData.id);
    if (index !== -1) {
      // Update cliente if cedulaCliente is provided
      if (updatedPetData.cedulaCliente) {
        if (!this.mockPets[index].cliente) {
          this.mockPets[index].cliente = new Cliente({
            id: updatedPetData.id,
            cedula: updatedPetData.cedulaCliente,
            nombre: 'Cliente ' + updatedPetData.cedulaCliente,
            correo: `cliente${updatedPetData.cedulaCliente}@example.com`,
            celular: '0000000000',
            contrasena: 'password'
          });
        } else {
          // Use non-null assertion operator to tell TypeScript that cliente is definitely defined here
          const clienteTemp = this.mockPets[index].cliente!;
          clienteTemp.cedula = updatedPetData.cedulaCliente;
        }
      }

      // Create a new Mascota object with the updated data
      // Exclude cedulaCliente as it's not a property of Mascota
      const { cedulaCliente, ...mascotaData } = updatedPetData;
      
      this.mockPets[index] = new Mascota({
        ...this.mockPets[index],
        ...mascotaData
      });
      
      // Preserve the cliente object if it exists and 'cliente' wasn't explicitly provided
      if (!updatedPetData.cliente && this.mockPets[index].cliente) {
        this.mockPets[index].cliente = this.mockPets[index].cliente;
      }
      
      this.pets.next([...this.mockPets]);
      
      // Broadcast the change to other tabs
      this.broadcastUpdate();
    }
  }

  deletePet(id: number): void {
    const index = this.mockPets.findIndex(pet => pet.id === id);
    if (index !== -1) {
      this.mockPets.splice(index, 1);
      this.pets.next([...this.mockPets]);
      
      // Broadcast the change to other tabs
      this.broadcastUpdate();
    }
  }

  searchPets(query: string): Mascota[] {
    if (!query.trim()) {
      return [...this.mockPets];
    }
    
    query = query.toLowerCase();
    return this.mockPets.filter(pet => 
      pet.nombre.toLowerCase().includes(query) ||
      pet.raza.toLowerCase().includes(query) ||
      pet.enfermedad?.toLowerCase().includes(query) ||
      pet.cliente?.cedula?.toLowerCase().includes(query) ||
      pet.cliente?.nombre.toLowerCase().includes(query)
    );
  }
    */
}
