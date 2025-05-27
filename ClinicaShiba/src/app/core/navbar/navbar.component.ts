import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isDropdownOpen = false;
  isScrolled = false;
  showCartDrawer = false;
  isMobileMenuOpen = false;

  @ViewChild('profileRef') profileRef!: ElementRef;

  constructor(private router: Router, private authService: AuthService) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openCartDrawer(): void {
    this.showCartDrawer = true;
  }

  closeCartDrawer(): void {
    this.showCartDrawer = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
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

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  ngOnDestroy(): void {
    // Cleanup logic can go here
  }
}
