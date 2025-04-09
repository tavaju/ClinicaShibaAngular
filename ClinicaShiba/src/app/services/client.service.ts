import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, catchError } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:8090/cliente';
  private clientsSubject = new BehaviorSubject<Cliente[]>([]);

  constructor(private http: HttpClient) {}

  // Get all clients
  getClients(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/all`).pipe(
      map(clients => clients.map(client => new Cliente(client)))
    );
  }

  // Get client by ID
  getClientById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/find/${id}`).pipe(
      map(client => new Cliente(client))
    );
  }

  // Get client by cédula
  getClientByCedula(cedula: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/findByCedula?cedula=${cedula}`).pipe(
      map(client => {
        if (!client) {
          throw new Error(`No se encontró cliente con cédula: ${cedula}`);
        }
        return new Cliente(client);
      }),
      catchError(error => {
        console.error(`Error buscando cliente con cédula ${cedula}:`, error);
        throw new Error(`No se encontró cliente con cédula: ${cedula}`);
      })
    );
  }

  // Add new client
  addClient(client: Cliente, confirmPassword: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add`, {
      ...client,
      confirmPassword
    });
  }

  // Update client
  updateClient(
    id: number,
    client: Cliente,
    changePassword: boolean = false,
    newPassword?: string,
    confirmPassword?: string
  ): Observable<void> {
    const url = `${this.baseUrl}/update/${id}`;
    const params: any = { changePassword };
    
    if (changePassword && newPassword && confirmPassword) {
      params.newPassword = newPassword;
      params.confirmPassword = confirmPassword;
    }

    return this.http.put<void>(url, client, { params });
  }

  // Delete client
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Search clients locally
  searchClients(query: string): Cliente[] {
    const currentClients = this.clientsSubject.getValue();
    return currentClients.filter(client =>
      client.nombre?.toLowerCase().includes(query.toLowerCase()) ||
      client.cedula?.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Login client (nuevo método)
  loginClient(email: string, password: string): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/login`, { email, password });
  }
}
