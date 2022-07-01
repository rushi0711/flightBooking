import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';
import seatDetails from '../entities/seatDetails';

const API_URL = 'http://ec2-54-187-203-225.us-west-2.compute.amazonaws.com:9003/api/test/';
const API_URL_Admin = 'http://ec2-54-187-203-225.us-west-2.compute.amazonaws.com:9003/admin/';
const API_URL_USER = 'http://ec2-54-187-203-225.us-west-2.compute.amazonaws.com:9004/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  //started
  addFlight(airlineDetails: {airline:string,fromPlace:string,toPlace:string,departDate:Date,departureTime:Time,arrivalTime:Time,scheduleDays:string,tripType:string,instrumentUsed:string,businessSeats:number,economySeats:number,ticketCost:number,noOfRows:number,mealType:string}){
    return this.http.post(API_URL_Admin + 'flight/add',airlineDetails);
  }

  getFlightById(flightNo){
    return this.http.get(API_URL_Admin + 'getFlightById/'+flightNo)
  }

  editFlightDetails(flightNo, airlineDetails: {airline:string,fromPlace:string,toPlace:string,departDate:Date,departureTime:Time,arrivalTime:Time,scheduleDays:string,tripType:string,instrumentUsed:string,businessSeats:number,economySeats:number,ticketCost:number,noOfRows:number,mealType:string}){
    return this.http.put(API_URL_Admin + 'flight/changeFlightDetails/'+flightNo,airlineDetails);
  }

  getActiveFlight(){
    return this.http.get(API_URL_Admin + 'activeFlights')
  }

  getAllFlight(){
    return this.http.get(API_URL_Admin + 'allFlights');
  }

  blockFlight(flighNo, airlineDetails: {}){
    return this.http.put(API_URL_Admin + 'flight/block/'+flighNo,airlineDetails);
  }

  unblockFlight(flighNo, airlineDetails: {}){
    return this.http.put(API_URL_Admin + 'flight/unblock/'+flighNo,airlineDetails);
  }

  //user
  getFlightsByData(fromPlace, toPlace, fromdate, toDate){
    return this.http.get(API_URL_USER + 'FindFlight/'+fromPlace +'/'+toPlace+ '/'+fromdate+ '/'+toDate);
  }

  bookTicket(bookingTickets:{ticketNo:number ,pnrNumber:number, flightNo:number, email:string, noOfSeats:number, seatNumber:number, name:string, gender:string, age:number, optForMeal:string, bookedDate:Date, status:Boolean}){
    console.log(bookingTickets);
    return this.http.post(API_URL_USER + 'bookFlight',bookingTickets);
  }

  getBookingHistory(email:string){
    return this.http.get(API_URL_USER + 'booking/history/'+email)
  }

  cancelTicket(pnrNumber,bookingTicket:{}){
    return this.http.put(API_URL_USER + 'booking/cancel/'+pnrNumber,bookingTicket);
  }

  serachTicketByPRN(prnNumber:string){
    return this.http.get(API_URL_USER + 'flight/ticket/'+prnNumber)
  }

}
