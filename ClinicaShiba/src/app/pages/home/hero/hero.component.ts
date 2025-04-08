import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroContent') heroContent!: ElementRef;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.heroContent.nativeElement.classList.add('reveal');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(this.heroContent.nativeElement);
  }

  buscarMascota(id: string) {
    if (id && id.trim() !== '') {
      this.router.navigate(['/pets', id]);
    }
  }
}
