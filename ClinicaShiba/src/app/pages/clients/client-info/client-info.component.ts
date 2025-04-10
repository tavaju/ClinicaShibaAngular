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
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      console.log('Correo recibido:', email); // Debug log
      this.loadClientAndPets(email);
    } else {
      console.error(
        'Correo no recibido. Verifique que el parámetro "email" se está enviando correctamente.'
      );
    }
  }

  loadClientAndPets(email: string): void {
    this.clientService.getClientByEmail(email).subscribe({
      next: (client) => {
        console.log('Cliente obtenido:', client); // Debug log
        this.client = client;
        if (client && client.id) {
          this.petService.getPetsByClientId(client.id).subscribe({
            next: (pets) => {
              console.log('Mascotas obtenidas:', pets); // Debug log
              this.pets = pets;
            },
            error: (err) => {
              console.error(
                `Error buscando mascotas para el cliente ${client.id}:`,
                err
              ); // Detailed error log
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
        console.error('Error al obtener cliente:', err); // Error log
        this.client = null;
        this.pets = [];
      },
    });
  }
}
