import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isDropdownOpen = false;
  isScrolled = false;
  showCartDrawer = false;

  @ViewChild('profileRef') profileRef!: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openCartDrawer(): void {
    this.showCartDrawer = true;
  }

  closeCartDrawer(): void {
    this.showCartDrawer = false;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement): void {
    if (this.profileRef && !this.profileRef.nativeElement.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  navigateToDashboard(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.navigateToDashboard();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
