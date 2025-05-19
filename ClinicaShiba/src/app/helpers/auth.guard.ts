import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }

    // Redirección personalizada según la ruta
    const url = state.url;
    if (url.startsWith('/vets/dashboard')) {
      return this.router.parseUrl('/login/vet');
    }
    if (url.startsWith('/cliente/home')) {
      return this.router.parseUrl('/login');
    }
    if (url.startsWith('/admin/dashboard')) {
      return this.router.parseUrl('/login/admin');
    }

    // Por defecto, redirige al login general
    return this.router.parseUrl('/login');
  }
}