import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesComponent } from './specialties.component';

describe('SpecialtiesComponent', () => {
  let component: SpecialtiesComponent;
  let fixture: ComponentFixture<SpecialtiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialtiesComponent]
    });
    fixture = TestBed.createComponent(SpecialtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
