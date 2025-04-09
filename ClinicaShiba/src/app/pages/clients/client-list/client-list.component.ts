import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Cliente } from '../../../model/cliente';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Cliente[] = [];
  searchQuery: string = '';
  showDeleteModal = false;
  selectedClient?: Cliente;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
      }
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    if (query) {
      this.clients = this.clientService.searchClients(query);
    } else {
      this.loadClients();
    }
  }

  confirmDelete(client: Cliente): void {
    this.selectedClient = client;
    this.showDeleteModal = true;
  }

  onDeleteConfirmed(): void {
    if (this.selectedClient?.id) {
      this.clientService.deleteClient(this.selectedClient.id).subscribe({
        next: () => {
          this.loadClients();
          this.showDeleteModal = false;
          this.selectedClient = undefined;
        },
        error: (error) => {
          console.error('Error deleting client:', error);
        }
      });
    }
  }

  onDeleteCancelled(): void {
    this.showDeleteModal = false;
    this.selectedClient = undefined;
  }
}