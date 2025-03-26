import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pet-banner',
  templateUrl: './pet-banner.component.html',
  styleUrls: ['./pet-banner.component.css']
})
export class PetBannerComponent {
  @Input() title: string = '';
}
