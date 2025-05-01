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
  allClients: Cliente[] = []; // Store all clients
  clients: Cliente[] = []; // Store current page clients
  searchQuery: string = '';
  showDeleteModal = false;
  selectedClient?: Cliente;

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  totalClients: number = 0;
  filteredClients: Cliente[] = []; // Store filtered clients for search

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
        this.allClients = clients;
        this.totalClients = clients.length;
        this.totalPages = Math.ceil(this.totalClients / this.pageSize);
        this.filteredClients = [...this.allClients]; // Initialize filteredClients with all clients
        this.updateDisplayedClients();
      },
      error: (error) => {
        console.error('Error loading clients:', error);
      }
    });
  }

  updateDisplayedClients(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredClients.length);
    this.clients = this.filteredClients.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedClients();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedClients();
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.filteredClients = this.allClients.filter(client => 
        client.nombre?.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        client.cedula?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        client.correo?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredClients = [...this.allClients];
    }
    
    this.totalClients = this.filteredClients.length;
    this.totalPages = Math.ceil(this.totalClients / this.pageSize);
    this.currentPage = 1; // Reset to first page on new search
    this.updateDisplayedClients();
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