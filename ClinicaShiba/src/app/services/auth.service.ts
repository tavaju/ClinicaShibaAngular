import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;  // Define role to dashboard URL mapping
  private roleDashboardMap: { [key: string]: string } = {
    'ADMIN': '/admin/dashboard',
    'VET': '/vets/dashboard',
    'CLIENT': '/cliente/home'
  };

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
  }  /**
   * Extracts the user role from the JWT token
   * @returns The user's role or null if token is invalid or missing
   */
  getUserRole(): Observable<string | null> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return of(null);
    }
    
    // Try to validate token with backend first
    return this.validateToken(token).pipe(
      catchError(() => {
        // Fallback to local token decoding if the backend is unavailable
        try {
          const decodedToken: any = jwtDecode(token);
          // Check for role in different possible locations in the token
          const role = decodedToken?.role || 
                      decodedToken?.roles?.[0] || 
                      decodedToken?.authorities?.[0]?.authority?.replace('ROLE_', '') ||
                      decodedToken?.auth?.replace('ROLE_', '') ||
                      null;
          
          console.log('Decoded token role:', role);
          return of(role);
        } catch (error) {
          console.error('Error decoding token:', error);
          return of(null);
        }
      })
    );
  }
  /**
   * Validates the token with the backend to get user role
   * @param token The JWT token to validate
   * @returns Observable with the user role
   */
  validateToken(token: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<any>(`${this.baseUrl}/validate`, { headers }).pipe(
      map(response => {
        // Store username if it's returned by the backend
        if (response.username) {
          localStorage.setItem('username', response.username);
        }
        return response.role;
      }),
      catchError(error => {
        console.error('Error validating token:', error);
        return throwError(() => error);
      })
    );
  }  /**
   * Navigates to the appropriate dashboard based on user role
   */
  navigateToDashboard(): void {
    this.getUserRole().subscribe(role => {
      if (!role) {
        console.log('No role found, redirecting to login');
        this.router.navigate(['/login']);
        return;
      }
      
      // Convert the role to uppercase to match our mapping keys
      const normalizedRole = role.toUpperCase();
      console.log(`User role detected: ${normalizedRole}`);
      
      const dashboardUrl = this.roleDashboardMap[normalizedRole];
      
      if (dashboardUrl) {
        // For CLIENT role, add username to URL if needed
        if (normalizedRole === 'CLIENT') {
          // Check if we need to add a query parameter for client identification
          const username = localStorage.getItem('username');
          if (username && dashboardUrl.includes('cliente/home')) {
            console.log(`Redirecting CLIENT to: ${dashboardUrl} with email: ${username}`);
            this.router.navigate([dashboardUrl]);
            return;
          }
        }
        
        console.log(`Redirecting to: ${dashboardUrl}`);
        this.router.navigate([dashboardUrl]);
      } else {
        // Default fallback if role is not recognized
        console.log(`Unknown role: ${normalizedRole}, redirecting to home`);
        this.router.navigate(['/']);
      }
    });
  }
}
