import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from 'src/app/model/cart.model';
import { Product } from 'src/app/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';
  private cartSubject: BehaviorSubject<Cart>;

  constructor() {
    const storedCart = localStorage.getItem(this.cartKey);
    this.cartSubject = new BehaviorSubject<Cart>(
      storedCart ? JSON.parse(storedCart) : { items: [], total: 0 }
    );
  }

  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private saveCart(cart: Cart): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  addToCart(product: Product | string, quantity: number = 1): void {
    const cart = this.cartSubject.value;
    const productId = typeof product === 'string' ? product : product.id;
    const existingItem = cart.items.find(
      (item) => item.product.id === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // Si solo tienes el id, deberías buscar el producto completo antes de agregarlo
      if (typeof product === 'string') {
        // No se puede agregar solo con id, requiere el objeto Product
        return;
      }
      cart.items.push({ product, quantity });
    }
    cart.total = this.calculateTotal(cart);
    this.saveCart(cart);
  }

  removeFromCart(productId: string): void {
    const cart = this.cartSubject.value;
    cart.items = cart.items.filter((item) => item.product.id !== productId);
    cart.total = this.calculateTotal(cart);
    this.saveCart(cart);
  }

  updateQuantity(productId: string, quantity: number): void {
    const cart = this.cartSubject.value;
    const item = cart.items.find((i) => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
    cart.total = this.calculateTotal(cart);
    this.saveCart(cart);
  }

  clearCart(): void {
    const cart: Cart = { items: [], total: 0 };
    this.saveCart(cart);
  }

  private calculateTotal(cart: Cart): number {
    return cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}
