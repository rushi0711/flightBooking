import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import BookingTicket from 'src/app/entities/BookingTicket';
import { UserService } from 'src/app/_services/user.service';
import { jsPDF } from 'jspdf';
import AirlineDetails from 'src/app/entities/AirlineDetails';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  hideContent:boolean= false;
   @ViewChild('content') content:ElementRef;
  bookedTickets : BookingTicket[] = [];
  constructor(public userservice: UserService, private route: ActivatedRoute) { }
  email:string;
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.email = params.userEmail;
      console.log(this.email);
  });

    const promise = this.userservice.getBookingHistory(this.email);
    promise.subscribe((response) => {
      console.log(response);
      this.bookedTickets = response as BookingTicket[];
    })
  }
  display = "none";
  pnrNumber:number;
  openModal(pnrNumber) {
    this.display = "block";
    console.log(pnrNumber);
    this.pnrNumber=pnrNumber;
  }
  onCloseHandled() {
    this.display = "none";
    this.pnrNumber = null;
    this.cancelError=false;
    //this.ngForm.reset();
  }

  cancelError:boolean = false;
  onFormSubmit() {
    if(this.pnrNumber != null){
      const promise = this.userservice.cancelTicket(this.pnrNumber,null);
    promise.subscribe((response) => {
      console.log(response);
      if(response == -1){
          this.cancelError= true;
      }else{
        this.reloadPage();
      } 
    })
    }
  }


  bookingTicket: BookingTicket = new BookingTicket();
  airlineDetail: AirlineDetails = new AirlineDetails();
  
  downloadPdf(prnNumber){
    //fetch data from backend
    const observable = this.userservice.serachTicketByPRN(prnNumber);
    observable.subscribe(
      (response: any) => {
        console.log(response);
       this.bookingTicket = response as BookingTicket;
          const promise = this.userservice.getFlightById(this.bookingTicket.flightNo);
          promise.subscribe((response) => {
          this.airlineDetail = response as AirlineDetails;
            console.log("----------"+this.airlineDetail.fromPlace)
          if(this.airlineDetail != null){
            this.hideContent=true;  
            setTimeout(() => {
                this.callDownloadPdf(prnNumber);
                this.hideContent=false;
            }, 10);
          }
          })
      },
      function(error){
        console.log(error);
        alert("Something went wrong please try again!");
      }
  )

  }

  callDownloadPdf(prnNumber){
    let pdf = new jsPDF('p','pt','a4');
            pdf.html(this.content.nativeElement,{
              callback: (pdf) => {
                pdf.save(prnNumber+".pdf");
              }
            })
  }

  reloadPage(): void {
    window.location.reload();
  }

}
