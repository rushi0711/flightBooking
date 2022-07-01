import { Time } from "@angular/common";

export default class AirlineDetails{
    flightNo:number;
    airline:string = "";
    fromPlace:string = "";
    toPlace:string = "";
    departDate:Date;
    departureTime:Time;
    arrivalTime:Time;
    scheduleDays:string = "";
    tripType:string = "";
    instrumentUsed:string = "";
    businessSeats:number;
    economySeats:number ;
    ticketCost:number;
    noOfRows:number;
    mealType:string = "";
    flightStatus:boolean;
    fromDate:Date;
    toDate:Date;
}