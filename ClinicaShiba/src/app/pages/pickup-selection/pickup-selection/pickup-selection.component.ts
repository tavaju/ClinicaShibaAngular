import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';

interface PickupPoint {
  lat: number;
  lng: number;
  address: string;
}

@Component({
  selector: 'app-pickup-selection',
  templateUrl: './pickup-selection.component.html',
  styleUrls: ['./pickup-selection.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PickupSelectionComponent implements AfterViewInit {
  pickupPoints: PickupPoint[] = [
    { lat: 4.6482837, lng: -74.2478948, address: 'Calle 80 # 69-70, Bogotá' },
    { lat: 4.6097102, lng: -74.081749, address: 'Cra 7 # 32-16, Bogotá' },
    { lat: 4.666667, lng: -74.05, address: 'Av. Suba # 100-20, Bogotá' },
  ];
  selectedPoint: PickupPoint | null = null;
  selectedDate: string = '';
  selectedTime: string = '';
  private map: L.Map | null = null;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([4.6482837, -74.2478948], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Agregar marcadores
    this.pickupPoints.forEach((point) => {
      L.marker([point.lat, point.lng], {
        icon: L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        }),
      })
        .addTo(this.map!)
        .on('click', () => this.selectPoint(point));
    });
  }

  selectPoint(point: PickupPoint) {
    this.selectedPoint = point;
  }

  confirmPickup() {
    if (!this.selectedPoint || !this.selectedDate || !this.selectedTime) return;
    this.router.navigate(['/resumen'], {
      state: {
        pickup: {
          point: this.selectedPoint,
          date: this.selectedDate,
          time: this.selectedTime,
        },
      },
    });
  }
}
