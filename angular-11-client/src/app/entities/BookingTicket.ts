import seatDetails from "./seatDetails";

export default class BookingTicket {
    ticketNo:number;
    pnrNumber:number;
    flightNo:number;
    email:string;
    noOfSeats:number;
    //seatDetails:seatDetails[];
    seatNumber:number;
    name:string;
    gender:string;
    age:number;
    optForMeal:string;
    bookedDate:Date;
    status:Boolean;
}