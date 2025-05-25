import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { SelectItem } from 'primeng/api';
import { FilterService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = '';
  layout: 'list' | 'grid' = 'grid';
  searchQuery: string = '';
  loading: boolean = true;
  error: string | null = null;

  // Category and status filter options
  categories: SelectItem[] = [];
  selectedCategory: string | null = null;
  statusOptions: SelectItem[] = [];
  selectedStatus: string | null = null;
  selectedSort: string | null = null;

  private productsSubscription?: Subscription;

  constructor(
    private productService: ProductService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.setupSortOptions();
    this.setupFilterOptions();
  }

  loadProducts() {
    this.loading = true;
    this.error = null;

    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }

    let productsObservable;

    if (this.selectedCategory && this.selectedStatus) {
      // Si ambos filtros están activos, pide por categoría y filtra por status en frontend
      productsObservable = this.productService.getProductsByCategory(
        this.selectedCategory
      );
    } else if (this.selectedCategory) {
      productsObservable = this.productService.getProductsByCategory(
        this.selectedCategory
      );
    } else if (this.selectedStatus) {
      productsObservable = this.productService.getProductsByStatus(
        this.selectedStatus
      );
    } else {
      productsObservable = this.productService.getProducts();
    }

    this.productsSubscription = productsObservable
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          // Si ambos filtros están activos, filtra por status en frontend
          if (this.selectedCategory && this.selectedStatus) {
            this.products = data.filter(
              (product) => product.inventoryStatus === this.selectedStatus
            );
          } else {
            this.products = data;
          }
          // Siempre actualiza los productos filtrados
          this.applySearchFilter();
        },
        error: (err) => {
          this.error =
            'Error al cargar productos. Por favor, intente nuevamente más tarde.';
          console.error('Error fetching products:', err);
        },
      });
  }

  setupSortOptions() {
    this.sortOptions = [
      { label: 'Precio de mayor a menor', value: '!price' },
      { label: 'Precio de menor a mayor', value: 'price' },
      { label: 'Nombre A-Z', value: 'name' },
      { label: 'Nombre Z-A', value: '!name' },
      { label: 'Valoración', value: '!rating' },
    ];
  }

  setupFilterOptions() {
    // Setup category options
    this.categories = [
      { label: 'Todas las categorías', value: null },
      { label: 'Alimentos', value: 'Alimentos' },
      { label: 'Accesorios', value: 'Accesorios' },
      { label: 'Salud', value: 'Salud' },
      { label: 'Higiene', value: 'Higiene' },
      { label: 'Juguetes', value: 'Juguetes' },
      { label: 'Servicios', value: 'Servicios' },
      { label: 'Equipamiento', value: 'Equipamiento' },
    ];

    // Setup inventory status options
    this.statusOptions = [
      { label: 'Todos los productos', value: null },
      { label: 'En stock', value: 'INSTOCK' },
      { label: 'Poco stock', value: 'LOWSTOCK' },
      { label: 'Agotado', value: 'OUTOFSTOCK' },
    ];
  }

  onSortChange(event: any) {
    const value = event.value;
    this.selectedSort = value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  getInventoryStatus(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'En stock';
      case 'LOWSTOCK':
        return 'Poco stock';
      case 'OUTOFSTOCK':
        return 'Agotado';
      default:
        return status;
    }
  }

  formatPrice(price: number): string {
    // Format number with dot as thousands separator without decimal places
    return price
      .toLocaleString('es-ES', {
        useGrouping: true,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      })
      .replace(/\./g, '.');
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = query;
    this.applySearchFilter();
  }

  applySearchFilter(): void {
    const query = this.searchQuery.toLowerCase();

    if (!query) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      });
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applySearchFilter();
  }

  onCategoryChange(category: string | null): void {
    this.selectedCategory = category;
    this.loadProducts();
  }

  onStatusChange(status: string | null): void {
    this.selectedStatus = status;
    this.loadProducts();
  }

  clearFilters(): void {
    this.selectedCategory = null;
    this.selectedStatus = null;
    this.selectedSort = null;
    this.sortField = '';
    this.sortOrder = 0;
    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
