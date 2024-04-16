import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightRecordComponent } from './flight-record.component';

describe('FlightRecordComponent', () => {
  let component: FlightRecordComponent;
  let fixture: ComponentFixture<FlightRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightRecordComponent]
    });
    fixture = TestBed.createComponent(FlightRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
