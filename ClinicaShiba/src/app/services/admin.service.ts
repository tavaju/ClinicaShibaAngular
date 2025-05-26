import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { Administrador } from '../model/administrador';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = `${environment.apiUrl}/administrador`;

  constructor(private http: HttpClient) {}

  // Get all administrators
  getAllAdmins(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(`${this.baseUrl}/all`);
  }

  // Get administrator by ID
  getAdminById(id: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.baseUrl}/find/${id}`);
  }

  // Get administrator by cedula
  getAdminByCedula(cedula: string): Observable<Administrador> {
    return this.http
      .get<Administrador>(`${this.baseUrl}/find/cedula/${cedula}`)
      .pipe(
        map((admin) => {
          if (!admin) {
            throw new Error(
              `No se encontró administrador con cédula: ${cedula}`
            );
          }
          return admin;
        }),
        catchError((error) => {
          console.error(
            `Error buscando administrador con cédula ${cedula}:`,
            error
          );
          throw new Error(`No se encontró administrador con cédula: ${cedula}`);
        })
      );
  }
  // Login que recibe token y datos del admin
  loginAdmin(cedula: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, 
      { cedula, contrasena: password },  // Enviar credenciales en el cuerpo de la solicitud
      { responseType: 'text' }
    );
  }

  // Add a new administrator
  addAdmin(admin: Administrador, confirmPassword: string): Observable<void> {
    const params = { confirmPassword };
    return this.http.post<void>(`${this.baseUrl}/add`, admin, { params });
  }

  // Update an existing administrator
  updateAdmin(
    id: number,
    admin: Administrador,
    changePassword: boolean,
    newPassword?: string,
    confirmPassword?: string
  ): Observable<void> {
    const params: any = {
      changePassword,
      newPassword,
      confirmPassword,
    };
    return this.http.put<void>(`${this.baseUrl}/update/${id}`, admin, {
      params,
    });
  }

  // Delete an administrator by ID
  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Get administrator details for admin home
  adminHome(): Observable<Administrador> {
    return this.http.get<Administrador>(
      `${environment.apiUrl}/administrador/details`
    );
  }
}
