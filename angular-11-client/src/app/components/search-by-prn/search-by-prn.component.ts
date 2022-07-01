import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import AirlineDetails from 'src/app/entities/AirlineDetails';
import BookingTicket from 'src/app/entities/BookingTicket';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-search-by-prn',
  templateUrl: './search-by-prn.component.html',
  styleUrls: ['./search-by-prn.component.css']
})
export class SearchByPRNComponent implements OnInit {
  search_ticket_form: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) { 

    this.search_ticket_form = fb.group({
      'prnNumber': [null, Validators.required]
    });
  }
prnNumber:string="";
searchedSuccess=false;
emptyRecord=false;
butDisabled: boolean = true;
bookingTicket: BookingTicket = new BookingTicket();
airlineDetail: AirlineDetails = new AirlineDetails();
serachByPRN(){
  this.markFormTouched(this.search_ticket_form);
    if (this.search_ticket_form.valid) {
      const observable = this.userService.serachTicketByPRN(this.prnNumber)
      observable.subscribe(
        (response: any) => {
          //his.bookTicket = false;
          console.log(response);
         this.bookingTicket = response as BookingTicket;
         console.log(this.bookingTicket);
          if(this.bookingTicket != null && this.bookingTicket){
            this.searchedSuccess = true;
            this.emptyRecord=false;
            const promise = this.userService.getFlightById(this.bookingTicket.flightNo);
            promise.subscribe((response) => {
            //console.log(response);
            this.airlineDetail = response as AirlineDetails;
            })
          }
          else{
            
            this.emptyRecord=true;
            this.searchedSuccess = false;
            console.log(this.emptyRecord);
          }
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
  ngOnInit(): void {
  }

}
