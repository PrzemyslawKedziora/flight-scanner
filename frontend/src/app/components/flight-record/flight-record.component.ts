import {Component, Input} from '@angular/core';
import {FlightDetailsModel} from "../../models/flight-details.model";

@Component({
  selector: 'app-flight-record',
  templateUrl: './flight-record.component.html',
  styleUrls: ['./flight-record.component.scss']
})
export class FlightRecordComponent {
  @Input() flightRecord!:FlightDetailsModel;
}
