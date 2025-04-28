import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdminComponent } from './login-admin.component';

describe('LoginAdminComponent', () => {
  let component: LoginAdminComponent;
  let fixture: ComponentFixture<LoginAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAdminComponent]
    });
    fixture = TestBed.createComponent(LoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
