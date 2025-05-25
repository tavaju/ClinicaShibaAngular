import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Cart } from '../../../model/cart.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  cart$: Observable<Cart> = this.cartService.getCart();

  constructor(private router: Router, private cartService: CartService) {}

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
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
