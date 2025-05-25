import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupSelectionComponent } from './pickup-selection.component';

describe('PickupSelectionComponent', () => {
  let component: PickupSelectionComponent;
  let fixture: ComponentFixture<PickupSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickupSelectionComponent]
    });
    fixture = TestBed.createComponent(PickupSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
