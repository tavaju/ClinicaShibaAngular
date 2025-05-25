import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cart } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8090/api/cart';
  private cartSubject = new BehaviorSubject<Cart>({ items: [], total: 0 });

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart() {
    this.http.get<Cart>(this.apiUrl)
      .pipe(catchError(err => {
        // Manejo de error: podrías mostrar un mensaje al usuario
        return throwError(() => err);
      }))
      .subscribe(cart => this.cartSubject.next(this.calculateTotal(cart)));
  }

  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  addToCart(productId: string, quantity: number = 1): void {
    this.http.post<Cart>(`${this.apiUrl}/add`, { productId, quantity })
      .pipe(catchError(err => {
        // Manejo de error: podrías mostrar un mensaje al usuario
        return throwError(() => err);
      }))
      .subscribe(cart => this.cartSubject.next(this.calculateTotal(cart)));
  }

  removeFromCart(productId: string): void {
    this.http.post<Cart>(`${this.apiUrl}/remove`, { productId })
      .pipe(catchError(err => {
        return throwError(() => err);
      }))
      .subscribe(cart => this.cartSubject.next(this.calculateTotal(cart)));
  }

  updateQuantity(productId: string, quantity: number): void {
    this.http.post<Cart>(`${this.apiUrl}/update`, { productId, quantity })
      .pipe(catchError(err => {
        return throwError(() => err);
      }))
      .subscribe(cart => this.cartSubject.next(this.calculateTotal(cart)));
  }

  clearCart(): void {
    this.http.post<Cart>(`${this.apiUrl}/clear`, {})
      .pipe(catchError(err => {
        return throwError(() => err);
      }))
      .subscribe(cart => this.cartSubject.next(this.calculateTotal(cart)));
  }

  // Si el backend no envía el total, lo calculas aquí:
  private calculateTotal(cart: Cart): Cart {
    if (cart && cart.items) {
      cart.total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }
    return cart;
  }
}