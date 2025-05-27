import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupSummaryComponent } from './pickup-summary.component';

describe('PickupSummaryComponent', () => {
  let component: PickupSummaryComponent;
  let fixture: ComponentFixture<PickupSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickupSummaryComponent]
    });
    fixture = TestBed.createComponent(PickupSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
