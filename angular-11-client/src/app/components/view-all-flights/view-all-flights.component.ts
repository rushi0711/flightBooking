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
  selector: 'app-view-all-flights',
  templateUrl: './view-all-flights.component.html',
  styleUrls: ['./view-all-flights.component.css']
})
export class ViewAllFlightsComponent implements OnInit {

  displayBlock = "none";
  displayUnblock = "none";
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
    const promise = this.userservice.getAllFlight();
    promise.subscribe((response) => {
      //console.log(response);
      this.airlineDetails = response as AirlineDetails[];
    })
  }
  

  fligthNoToBlock;
  openModalBlock(fligthNo) {
    this.displayBlock = "block";
    console.log(fligthNo);
    this.fligthNoToBlock=fligthNo;
  }

  openModalUnblock(fligthNo) {
    this.displayUnblock = "block";
    console.log(fligthNo);
    this.fligthNoToBlock=fligthNo;
  }
  onCloseHandled() {
    this.displayBlock = "none";
    this.displayUnblock = "none";
    this.fligthNoToBlock = null;
  }
  isChecked = true;
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });
  onFormSubmitBlock() {
    if(this.fligthNoToBlock != null){
      const promise = this.userservice.blockFlight(this.fligthNoToBlock,null);
    promise.subscribe((response) => {
      console.log(response);
      this.reloadPage();
    })
    }
  }

  onFormSubmitUnblock() {
    if(this.fligthNoToBlock != null){
      const promise = this.userservice.unblockFlight(this.fligthNoToBlock,null);
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
