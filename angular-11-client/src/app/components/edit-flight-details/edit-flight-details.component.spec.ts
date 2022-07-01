import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlightDetailsComponent } from './edit-flight-details.component';

describe('EditFlightDetailsComponent', () => {
  let component: EditFlightDetailsComponent;
  let fixture: ComponentFixture<EditFlightDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFlightDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFlightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
