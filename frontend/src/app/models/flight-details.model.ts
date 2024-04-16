import {FlightItinerariesModel} from "./flight-itineraries.model";

export interface FlightDetailsModel{
  id:number,
  itineraries:Array<FlightItinerariesModel>,
  numberOfBookableSeats:number,
  price:any,

}
