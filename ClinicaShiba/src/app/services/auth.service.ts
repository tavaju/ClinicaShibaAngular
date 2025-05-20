import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8090/auth';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Logs out the current user by sending a request to the backend and clearing local storage
   * @returns Observable with the logout response
   */
  logout(): Observable<any> {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // Set up HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    // Call the backend logout endpoint
    return this.http.post<any>(`${this.baseUrl}/logout`, {}, { headers })
      .pipe(
        tap(() => {
          // Clear token from localStorage
          localStorage.removeItem('token');
        }),
        catchError(error => {
          // Even if the server call fails, clear the token
          localStorage.removeItem('token');
          return throwError(() => error);
        })
      );
  }

  /**
   * Redirects the user to the appropriate page after logout
   */
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * Checks if the user is currently authenticated
   * @returns boolean indicating if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
