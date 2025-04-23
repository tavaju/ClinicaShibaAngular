import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentService } from '../../../services/treatment.service';
import { Droga } from '../../../model/droga';

@Component({
  selector: 'app-give-treatment',
  templateUrl: './give-treatment.component.html',
  styleUrls: ['./give-treatment.component.css'],
})
export class GiveTreatmentComponent implements OnInit {
  mascotaId!: number;
  veterinarioId!: number;
  selectedDrogaId!: number;
  availableDrugs: Droga[] = [];

  constructor(
    private route: ActivatedRoute,
    private treatmentService: TreatmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mascotaId = Number(this.route.snapshot.paramMap.get('mascotaId'));
    this.fetchAvailableDrugs();
  }

  fetchAvailableDrugs(): void {
    this.treatmentService.getAvailableDrugs().subscribe(
      (drugs) => {
        console.log('Fetched drugs:', drugs); // Debugging log
        this.availableDrugs = drugs;
      },
      (error) => {
        console.error('Error fetching drugs:', error); // Log the exact error
        alert(`Failed to fetch available drugs. Error: ${error.message}`);
      }
    );
  }

  giveTreatment(): void {
    if (this.selectedDrogaId && this.veterinarioId) {
      this.treatmentService
        .createTreatment(
          this.mascotaId,
          this.veterinarioId,
          this.selectedDrogaId
        )
        .subscribe(() => {
          alert('Tratamiento dado!');
          this.router.navigate(['/pets']);
        });
    } else {
      alert('Please fill in all fields.');
    }
  }
}
