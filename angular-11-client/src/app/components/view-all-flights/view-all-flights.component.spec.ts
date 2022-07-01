import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllFlightsComponent } from './view-all-flights.component';

describe('ViewAllFlightsComponent', () => {
  let component: ViewAllFlightsComponent;
  let fixture: ComponentFixture<ViewAllFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllFlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
