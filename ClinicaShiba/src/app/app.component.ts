import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('navbarRef') navbarRef!: ElementRef;
  @ViewChild('bannerRef') bannerRef!: ElementRef;

  lastScrollTop = 0;
  isLoginRoute: boolean = false;
  isErrorRoute: boolean = false;
  hideHeaderFooter: boolean = false;
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Check if current route is the error page
      this.hideHeaderFooter = event.urlAfterRedirects === '/error';
    });
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Check if current route is the error page
      this.hideHeaderFooter = event.urlAfterRedirects === '/error';
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
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
