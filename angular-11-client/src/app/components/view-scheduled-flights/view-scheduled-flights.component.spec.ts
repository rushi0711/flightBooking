import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScheduledFlightsComponent } from './view-scheduled-flights.component';

describe('ViewScheduledFlightsComponent', () => {
  let component: ViewScheduledFlightsComponent;
  let fixture: ComponentFixture<ViewScheduledFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewScheduledFlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScheduledFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
