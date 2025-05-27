import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDrawerComponent } from './cart-drawer.component';

describe('CartDrawerComponent', () => {
  let component: CartDrawerComponent;
  let fixture: ComponentFixture<CartDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartDrawerComponent]
    });
    fixture = TestBed.createComponent(CartDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
