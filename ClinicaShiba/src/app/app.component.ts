import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('navbarRef') navbarRef!: ElementRef;
  @ViewChild('bannerRef') bannerRef!: ElementRef;

  lastScrollTop = 0;
  isLoginRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoginRoute = this.router.url === '/login';
    });
  }

  ngAfterViewInit(): void {
    this.handleScroll(); // inicializa por si carga ya con scroll
  }

  @HostListener('window:scroll')
  handleScroll(): void {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // NAVBAR efecto glassmorphism
    if (currentScroll > 10) {
      this.navbarRef.nativeElement.classList.add('scrolled');
    } else {
      this.navbarRef.nativeElement.classList.remove('scrolled');
    }

    // BANNER: ocultar si scroll hacia abajo
    if (currentScroll > this.lastScrollTop && currentScroll > 50) {
      this.bannerRef.nativeElement.classList.add('hide');
    } else if (currentScroll < this.lastScrollTop) {
      this.bannerRef.nativeElement.classList.remove('hide');
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}
