import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetDashboardComponent } from './vet-dashboard.component';

describe('VetDashboardComponent', () => {
  let component: VetDashboardComponent;
  let fixture: ComponentFixture<VetDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VetDashboardComponent]
    });
    fixture = TestBed.createComponent(VetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
