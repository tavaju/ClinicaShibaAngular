import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../../model/cart.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.css'],
})
export class CartDrawerComponent {
  @Output() close = new EventEmitter<void>();
  cart$: Observable<Cart> = this.cartService.getCart();

  constructor(private cartService: CartService) {}

  getProductTotal(price: number, quantity: number): number {
    return price * quantity;
  }

  onClose(): void {
    this.close.emit();
  }

  increaseQty(item: any): void {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decreaseQty(item: any): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.product.id, item.quantity - 1);
    }
  }

  removeItem(item: any): void {
    this.cartService.removeFromCart(item.product.id);
  }
}
