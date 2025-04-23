import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveTreatmentComponent } from './give-treatment.component';

describe('GiveTreatmentComponent', () => {
  let component: GiveTreatmentComponent;
  let fixture: ComponentFixture<GiveTreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GiveTreatmentComponent]
    });
    fixture = TestBed.createComponent(GiveTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
