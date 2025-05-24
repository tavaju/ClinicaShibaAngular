import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  Inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { PetService } from '../../../services/pet.service';
import { AuthService } from '../../../services/auth.service';
import { DOCUMENT } from '@angular/common';
import { forkJoin } from 'rxjs';
// Import for Lucide icons
declare const lucide: any;

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css'],
})
export class ClientInfoComponent implements OnInit, AfterViewInit {
  client: any = null;
  pets: any[] = [];
  constructor(
    private clientService: ClientService,
    private petService: PetService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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
  /**
   * Logs the user out and redirects to the home page
   */
  logout(): void {
    console.log('Logout process initiated');
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
        // Even if there's an error, navigate to home
        this.router.navigate(['/']);
      },
    });
  }
  /**
   * Initialize Lucide icons after the view is rendered
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      // Try first with global lucide variable
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
        console.log('Lucide icons initialized via global variable');
      } else {
        // Alternative: manually load Lucide script if not already available
        this.loadLucideScript();
      }
    });
  }

  /**
   * Dynamically load the Lucide script if not already available
   */
  private loadLucideScript(): void {
    // Check if script is already loaded
    if (this.document.getElementById('lucide-script')) {
      return;
    }

    // Create script element
    const script = this.renderer.createElement('script');
    script.id = 'lucide-script';
    script.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
    script.onload = () => {
      if (typeof lucide !== 'undefined') {
        console.log('Lucide script loaded dynamically');
        lucide.createIcons();
      }
    };

    // Append to head
    this.renderer.appendChild(this.document.head, script);
  }
}
