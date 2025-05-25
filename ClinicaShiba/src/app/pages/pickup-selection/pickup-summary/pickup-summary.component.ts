import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-pickup-summary',
  templateUrl: './pickup-summary.component.html',
  styleUrls: ['./pickup-summary.component.css'],
})
export class PickupSummaryComponent {
  pickup: any;
  cart: any;
  payment: string;

  constructor(private router: Router, private cartService: CartService) {
    const nav = this.router.getCurrentNavigation();
    this.pickup = nav?.extras.state?.['pickup'] || null;
    this.cart = nav?.extras.state?.['cart'] || null;
    this.payment = nav?.extras.state?.['payment'] || '';
    // Vacía el carrito al llegar aquí
    this.cartService.clearCart();
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
