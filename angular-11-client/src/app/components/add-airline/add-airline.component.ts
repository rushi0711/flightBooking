import { Component, OnInit } from '@angular/core';
import AirlineDetails from 'src/app/entities/AirlineDetails';
import { UserService } from '../../_services/user.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})

export class AddAirlineComponent implements OnInit {
  addedSuccess = false;
  airlines = [
    {id: "Air India", name: "Air India"},
    {id: "Vistara", name: "Vistara"},
    {id: "Indigo", name: "Indigo"},
    {id: "SpiceJet", name: "SpiceJet"},
    {id: "Air Asia", name: "AirAsia"},
    {id: "GoAir(Now Go First)", name: "GoAir (Now Go First)"},
    {id: "Air India Express", name: "Air India Express"},
    {id: "Alliance Air", name: "Alliance Air"}
 ];

 
 instrumentUsed = [
  {id: "A320", name: "A320"},
  {id: "A320 neo", name: "A320 neo"},
  {id: "A220 Cockpit", name: "A220 Cockpit"},
  {id: "A330 Cockpit", name: "A330 Cockpit"},
  {id: "A350 Cockpit ", name: "A350 Cockpit "},
  {id: "A380 Cockpit.", name: "A380 Cockpit"}
];

scheduleDays =[
  {id: "Daily", name: "Daily"},
  {id: "Week Days", name: "Week Days"},
  {id: "Week Ends", name: " Week Ends"}
];
 
  add_flight_form: FormGroup;
  airlineDetails : AirlineDetails = new AirlineDetails();
  message:any;
  butDisabled: boolean = true;
  
  addFlight(){
    this.markFormTouched(this.add_flight_form);
    if (this.add_flight_form.valid) {
      const observable = this.userService.addFlight(this.airlineDetails);
      observable.subscribe(
        (response: any) => {
          this.addedSuccess = true;
          console.log(response);
          this.message=response;
        },
        function(error){
          console.log(error);
          alert("Something went wrong please try again!");
        }
    )
    }
    else {
      //this.add_flight_form.controls['terms'].setValue(false);
    }
  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };


  constructor(public userService: UserService,fb: FormBuilder) { 
    this.add_flight_form = fb.group({
      'fromplace': [null, Validators.required],
      'toPlace': [null, Validators.required],
      'airline': [null, Validators.required],
      'scheduleDays': [null, Validators.required],
      'departDate': [null, Validators.required],
      'departTime': [null, Validators.required],
      'arrivalTime': [null, Validators.required],
      'tripType': [null, Validators.required],
      'istrumentUsed': [null, Validators.required],
      'businessSeats': [null, Validators.required],
      'economySeats': [null, Validators.required],
      'itemPrice': [null, Validators.required],
      'noOfRows': [null, Validators.required],
      'mealType': [null, Validators.required]
    });

  }

  ngOnInit(): void {


    
  }

}
