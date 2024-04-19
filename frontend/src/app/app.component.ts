import {Component, Input} from '@angular/core'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() flights: Array<any>  = [];
  @Input() locations!: string[];
  @Input() isSubmitted = false;
  receiveListOfFlights($event: Array<any>){
    this.flights = $event;
  }
  receiveLocations($event: string[]){
    this.locations = $event;
  }
  receiveFormStatus($event: boolean){
    this.isSubmitted = $event;
  }
}
