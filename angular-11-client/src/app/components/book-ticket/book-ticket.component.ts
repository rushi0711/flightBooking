import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormArray, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import BookingTicket from 'src/app/entities/BookingTicket';
import seatDetails from 'src/app/entities/seatDetails';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  
  bookedSuccess:boolean=false;
  pnrNumber:number;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  optForMealVal: string;
  optForMeal: string[] = ['Yes', 'No'];

  bookingTickets: BookingTicket = new BookingTicket();
  seatDetails: seatDetails = new seatDetails();
  book_ticket_form: FormGroup;
  message:any;
  seatDetailList: seatDetails[] = [];
  @Input() flightNo:number;
  bookTicket(){
    this.markFormTouched(this.book_ticket_form);
    if (this.book_ticket_form.valid) {
      this.bookingTickets.flightNo=this.flightNo;
      // console.log(this.seatDetails);
      // this.seatDetailList.push(this.seatDetails);
      // console.log(this.seatDetailList);
      // this.bookingTickets.seatDetails=this.seatDetailList;
      const observable = this.userService.bookTicket(this.bookingTickets);
      observable.subscribe(
        (response: any) => {
          console.log(response);
          this.pnrNumber=response;
          this.bookedSuccess=true;
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
  constructor(public userService: UserService,fb: FormBuilder,private tokenStorageService: TokenStorageService) {


    this.book_ticket_form = fb.group({
      'emailControl': [null, Validators.required],
      'optForMeal': [null, Validators.required],
      'seatNumber': [null, Validators.required],
      'fullName': [null, Validators.required],
      'age': [null, Validators.required],
      'gender': [null, Validators.required]
    });

   }
   isLoggedIn=false;
   userEmail:string;
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userEmail = user.email;
    }
  }

}
