import { Component, Input, OnInit } from '@angular/core';
import AirlineDetails from 'src/app/entities/AirlineDetails';
import { UserService } from '../../_services/user.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-airline-details',
  templateUrl: './view-airline-details.component.html',
  styleUrls: ['./view-airline-details.component.css']
})
export class ViewAirlineDetailsComponent implements OnInit {

  flightNo;
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

flight_form_detail: FormGroup;
airlineDetail : AirlineDetails = new AirlineDetails();
message:any;
butDisabled: boolean = true;
// @Input() dataToTakeAsInput: any;

  constructor(public userService: UserService,fb: FormBuilder,private route: ActivatedRoute) { 
    this.flight_form_detail = fb.group({
      'fromplace': [],
      'toPlace': [],
      'airline': [],
      'scheduleDays': [],
      'departDate': [],
      'departTime': [],
      'arrivalTime': [],
      'tripType': [],
      'istrumentUsed': [],
      'businessSeats': [],
      'economySeats': [],
      'itemPrice': [],
      'noOfRows': [],
      'mealType': []
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flightNo = params.flightNo;
      console.log(this.flightNo);
  });

  const promise = this.userService.getFlightById(this.flightNo);
  promise.subscribe((response) => {
    //console.log(response);
    this.airlineDetail = response as AirlineDetails;
  })

  }

}
