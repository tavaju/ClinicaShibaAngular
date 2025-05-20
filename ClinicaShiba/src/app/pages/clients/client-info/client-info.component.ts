import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { PetService } from '../../../services/pet.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css'],
})
export class ClientInfoComponent implements OnInit {
  client: any = null;
  pets: any[] = [];

  constructor(
    private clientService: ClientService,
    private petService: PetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientService.clienteHome().subscribe({
      next: (client) => {
        this.client = client;
        if (client && client.id) {
          this.petService.getPetsByClientId(client.id).subscribe({
            next: (pets) => {
              this.pets = pets;
            },
            error: (err) => {
              console.error(
                `Error buscando mascotas para el cliente ${client.id}:`,
                err
              );
              this.pets = [];
            },
          });
        } else {
          this.pets = [];
        }
      },
      error: (err) => {
        console.error('Error al obtener cliente autenticado:', err);
        this.client = null;
        this.pets = [];
      },
    });
  }

  loadClientAndPets(email: string): void {
    this.clientService.getClientByEmail(email).subscribe({
      next: (client) => {
        this.client = client;
        if (client && client.id) {
          this.petService.getPetsByClientId(client.id).subscribe({
            next: (pets) => {
              this.pets = pets;
            },
            error: (err) => {
              console.error(
                `Error buscando mascotas para el cliente ${client.id}:`,
                err
              ); 
              this.pets = [];
            },
          });
        } else {
          console.error(
            'El cliente no tiene un ID válido para buscar mascotas.'
          );
          this.pets = [];
        }
      },
      error: (err) => {
        this.client = null;
        this.pets = [];
      },
    });
  }
}
