import { Component, ViewEncapsulation } from '@angular/core';
import { Map, tileLayer, latLng, marker, icon, Marker } from 'leaflet';

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
export class PickupSelectionComponent {
  pickupPoints: PickupPoint[] = [
    { lat: 4.6482837, lng: -74.2478948, address: 'Calle 80 # 69-70, Bogotá' },
    { lat: 4.6097102, lng: -74.081749, address: 'Cra 7 # 32-16, Bogotá' },
    { lat: 4.666667, lng: -74.05, address: 'Av. Suba # 100-20, Bogotá' },
  ];
  selectedPoint: PickupPoint | null = null;
  selectedDate: string = '';
  selectedTime: string = '';

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors',
      }),
    ],
    zoom: 12,
    center: latLng(4.6482837, -74.2478948),
  };

  pickupMarkers: Marker[] = [];

  constructor(private router: Router) {}

  onMapReady(event: any) {
    setTimeout(() => {
      const map = event as Map;
      this.pickupMarkers = this.pickupPoints.map((point) =>
        marker([point.lat, point.lng], {
          icon: icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          }),
        }).on('click', () => this.selectPoint(point))
      );
      this.pickupMarkers.forEach((m) => m.addTo(map));
      map.invalidateSize(); // <-- fuerza el render
    }, 100);
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
