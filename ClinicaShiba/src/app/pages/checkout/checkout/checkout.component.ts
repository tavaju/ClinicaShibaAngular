import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Cart } from '../../../model/cart.model';
import { CartService } from '../../../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  cart$: Observable<Cart> = this.cartService.getCart();
  selectedPayment: 'tarjeta' | 'efectivo' = 'tarjeta';
  paymentForm: FormGroup;

  constructor(
    private router: Router,
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    this.paymentForm = this.createCardForm();
  }

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

  selectPayment(method: 'tarjeta' | 'efectivo') {
    this.selectedPayment = method;
    this.paymentForm =
      method === 'tarjeta' ? this.createCardForm() : this.createCashForm();
  }

  createCardForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      expiry: [
        '',
        [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
      ],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  createCashForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    this.cart$
      .subscribe((cart) => {
        this.router.navigate(['/pickup'], {
          state: {
            cart,
            payment: this.selectedPayment,
          },
        });
      })
      .unsubscribe();
  }
}
