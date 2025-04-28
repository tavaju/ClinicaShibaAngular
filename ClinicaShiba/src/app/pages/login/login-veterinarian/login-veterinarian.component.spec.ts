import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVeterinarianComponent } from './login-veterinarian.component';

describe('LoginVeterinarianComponent', () => {
  let component: LoginVeterinarianComponent;
  let fixture: ComponentFixture<LoginVeterinarianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginVeterinarianComponent]
    });
    fixture = TestBed.createComponent(LoginVeterinarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
