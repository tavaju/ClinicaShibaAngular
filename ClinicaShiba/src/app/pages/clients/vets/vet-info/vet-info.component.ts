import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VetService } from '../../../../services/vet.service';
import { Veterinario } from '../../../../model/veterinario';

@Component({
  selector: 'app-vet-info',
  templateUrl: './vet-info.component.html',
  styleUrls: ['./vet-info.component.css'],
})
export class VetInfoComponent implements OnInit {
  veterinario!: Veterinario;

  constructor(
    private vetService: VetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const vetId = +this.route.snapshot.paramMap.get('id')!;
    this.vetService.getVetById(vetId).subscribe((vet) => {
      this.veterinario = vet;
    });
  }

  // Add a method to get estado text
  getEstadoTexto(): string {
    return this.veterinario?.estado ? 'Activo' : 'Inactivo';
  }

  navigateToEdit(): void {
    if (this.veterinario?.id) {
      this.router.navigate(['/vets/edit', this.veterinario.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/vets']);
  }
}
