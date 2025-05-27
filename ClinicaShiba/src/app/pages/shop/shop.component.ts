import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { SelectItem } from 'primeng/api';
import { FilterService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @ViewChild('dv') dataView!: DataView;
  
  allProducts: Product[] = []; // Almacena todos los productos sin filtrar
  filteredProducts: Product[] = []; // Productos después de aplicar filtros
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

  selectedQuantities: { [productId: string]: number } = {};

  private productsSubscription?: Subscription;

  constructor(
    private productService: ProductService,
    private filterService: FilterService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadAllProducts();
    this.setupSortOptions();
    this.setupFilterOptions();
  }

  loadAllProducts() {
    this.loading = true;
    this.error = null;

    this.productService
      .getProducts()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.allProducts = data;
          // Inicializar cantidades
          this.allProducts.forEach((product) => {
            if (!this.selectedQuantities[product.id]) {
              this.selectedQuantities[product.id] = 1;
            }
          });
          this.applyFilters();
        },
        error: (err) => {
          this.error =
            'Error al cargar productos. Por favor, intente nuevamente más tarde.';
          console.error('Error fetching products:', err);
        },
      });
  }  // Método mejorado para aplicar todos los filtros de una vez
  applyFilters(): void {
    let result = [...this.allProducts];

    // Aplicar filtro de categoría si está seleccionado
    if (this.selectedCategory && this.selectedCategory !== null) {
      result = result.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    // Aplicar filtro de disponibilidad si está seleccionado
    if (this.selectedStatus && this.selectedStatus !== null) {
      result = result.filter(
        (product) => product.inventoryStatus === this.selectedStatus
      );
    }

    // Aplicar filtro de búsqueda si hay texto
    const query = this.searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    this.filteredProducts = result;
    
    // Resetear la paginación al primer página cuando se aplican filtros
    if (this.dataView) {
      this.dataView.first = 0;
    }
    
    console.log('Filtros aplicados:', {
      categoria: this.selectedCategory,
      estado: this.selectedStatus,
      busqueda: this.searchQuery,
      productos_filtrados: result.length,
      productos_totales: this.allProducts.length
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
    return price
      .toLocaleString('es-ES', {
        useGrouping: true,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      })
      .replace(/\./g, '.');
  }
  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.trim();
    this.searchQuery = query;
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }
  onCategoryChange(category: string | null): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onStatusChange(status: string | null): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = null;
    this.selectedStatus = null;
    this.selectedSort = null;
    this.sortField = '';
    this.sortOrder = 0;
    this.applyFilters();
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
  addToCart(product: Product): void {
    const quantity = this.selectedQuantities[product.id] || 1;
    this.cartService.addToCart(product, quantity);
    this.selectedQuantities[product.id] = 1;
  }

  getFilteredProductsCount(): string {
    const filtered = this.filteredProducts.length;
    const total = this.allProducts.length;
    
    if (filtered === total) {
      return `${total} productos`;
    } else {
      return `${filtered} de ${total} productos`;
    }
  }

  hasActiveFilters(): boolean {
    return !!(this.selectedCategory || this.selectedStatus || this.searchQuery.trim());
  }
}
