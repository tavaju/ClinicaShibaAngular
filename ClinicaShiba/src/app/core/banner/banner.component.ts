import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit, OnDestroy {
  announcements: string[] = [
    '🎉 ¡Nuevo servicio de grooming disponible!',
    '🏥 Consultas de emergencia 24/7',
    '💉 20% de descuento en vacunas este mes',
  ];
  currentIndex = 0;
  intervalId: any;

  get currentAnnouncement(): string {
    return this.announcements[this.currentIndex];
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.next(), 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.announcements.length;
  }

  prev(): void {
    this.currentIndex =
      this.currentIndex === 0
        ? this.announcements.length - 1
        : this.currentIndex - 1;
  }
}
