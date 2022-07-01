import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import AirlineDetails from 'src/app/entities/AirlineDetails';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  serachedFlights=false;
  bookTicket = false;
  search_flight_form: FormGroup;
  airlineDetail : AirlineDetails = new AirlineDetails();
  message:any;
  airlineDetails : AirlineDetails[]=[];

  
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder, public datepipe: DatePipe) {

    this.search_flight_form = fb.group({
      'fromplace': [null, Validators.required],
      'toPlace': [null, Validators.required],
      'fromDate': [null, Validators.required],
      'toDate': [null, Validators.required]
      // 'departTime': [null, Validators.required],
      // 'arrivalTime': [null, Validators.required],
      // 'tripType': [null, Validators.required]
    });
   }
   timeStampFromDate:string;
   timeStampToDate:string;
   dateTimeStamp:string;
  searchFlight(){
    this.markFormTouched(this.search_flight_form);
    if (this.search_flight_form.valid) {
      console.log(this.airlineDetail.fromDate);
      console.log(this.airlineDetail.toDate);
      this.timeStampFromDate = this.datepipe.transform(this.airlineDetail.fromDate, 'yyyy-MM-dd');
      this.timeStampToDate = this.datepipe.transform(this.airlineDetail.toDate, 'yyyy-MM-dd');
      //console.log(Date.parse(this.formattedDeparteDate));
      const observable = this.userService.getFlightsByData(this.airlineDetail.fromPlace, this.airlineDetail.toPlace, Date.parse(this.timeStampFromDate), Date.parse(this.timeStampToDate))
      observable.subscribe(
        (response: any) => {
          this.serachedFlights = true;
          this.bookTicket = false;
          console.log(response);
         this.airlineDetails = response as AirlineDetails[];
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

  resetForm(){
    this.search_flight_form.reset();
    this.serachedFlights = false;
    this.bookTicket = false;
  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };

  ngOnInit(): void {
  }
  flightNo:number;
  openBookTicketForm(flightNo){
    console.log(flightNo);
    this.flightNo = flightNo;
    this.bookTicket = true;
    this.serachedFlights = false;
  }

  get getFlighNo() {
    return this.flightNo;
  }
  

}
