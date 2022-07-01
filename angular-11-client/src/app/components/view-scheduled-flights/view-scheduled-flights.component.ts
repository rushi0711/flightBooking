import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import AirlineDetails from 'src/app/entities/AirlineDetails';
import {FormBuilder, Validators} from '@angular/forms';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ViewAirlineDetailsComponent } from '../view-airline-details/view-airline-details.component';

@Component({
  selector: 'app-view-scheduled-flights',
  templateUrl: './view-scheduled-flights.component.html',
  styleUrls: ['./view-scheduled-flights.component.css']
})
export class ViewScheduledFlightsComponent implements OnInit {
  display = "none";
  airlineDetails : AirlineDetails[]=[];

  displayedColumns: string[] = ['airline', 'fromPlace', 'toPlace', 'departDate', 'departureTime' ,'scheduleDays', 'tripType', 'flightStatus'];
  dataSource = new MatTableDataSource<AirlineDetails>(this.airlineDetails);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(public userservice: UserService, public dialog: MatDialog,private _formBuilder: FormBuilder) { }

  openDialog(flighNo: number): void {
    this.dialog.open(ViewAirlineDetailsComponent, { });
  }


  ngOnInit(): void {
    const promise = this.userservice.getActiveFlight();
    promise.subscribe((response) => {
      //console.log(response);
      this.airlineDetails = response as AirlineDetails[];
    })
  }
  

  fligthNoToBlock;
  openModal(fligthNo) {
    this.display = "block";
    console.log(fligthNo);
    this.fligthNoToBlock=fligthNo;
  }
  onCloseHandled() {
    this.display = "none";
    this.fligthNoToBlock = null;
  }
  isChecked = true;
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });
  
  onFormSubmit() {
    if(this.fligthNoToBlock != null){
      const promise = this.userservice.blockFlight(this.fligthNoToBlock,null);
    promise.subscribe((response) => {
      console.log(response);
      this.reloadPage();
    })
    }
  }
  

  reloadPage(): void {
    window.location.reload();
  }
}
