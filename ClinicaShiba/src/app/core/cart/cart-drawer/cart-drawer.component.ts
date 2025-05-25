import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.css'],
})
export class CartDrawerComponent {
  @Output() close = new EventEmitter<void>();
  cart$ = this.cartService.getCart();

  constructor(private cartService: CartService) {}

  getProductTotal(price: number, quantity: number): number {
    return price * quantity;
  }

  onClose(): void {
    this.close.emit();
  }
}
