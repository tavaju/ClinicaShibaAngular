import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VetService } from '../../../../services/vet.service';
import { Veterinario } from '../../../../model/veterinario';

@Component({
  selector: 'app-vet-list',
  templateUrl: './vet-list.component.html',
  styleUrls: ['./vet-list.component.css'],
})
export class VetListComponent implements OnInit {
  veterinarios: Veterinario[] = [];
  searchQuery: string = '';

  constructor(private vetService: VetService, private router: Router) {}

  ngOnInit(): void {
    this.loadVets();
  }

  loadVets(): void {
    this.vetService.getAllVets().subscribe((vets) => {
      this.veterinarios = vets;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.veterinarios = this.veterinarios.filter((vet) =>
        vet.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadVets();
    }
  }

  navigateToAddVet(): void {
    this.router.navigate(['/vets/add']);
  }

  navigateToEditVet(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/vets/edit', id]);
    }
  }

  deleteVet(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este veterinario?')) {
      this.vetService.deleteVet(id).subscribe(() => {
        this.loadVets();
      });
    }
  }
}
