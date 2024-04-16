import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FlightService} from "../../services/flight/flight.service";
// import {FlightService} from "../../services/flight.service";

@Component({
  selector: 'app-browser-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './browser-form.component.html',
  styleUrls: ['./browser-form.component.scss']
})
export class BrowserFormComponent {
  @Output() flightsSender: EventEmitter<Array<any>> = new EventEmitter();
  @Output() locationsSender: EventEmitter<string[]> = new EventEmitter();
  availableFlights!:Array<any>;
  locations:string[] = [];
  flightForm = this.fb.group({
    origin: ['', Validators.required],
    destination: ['', Validators.required],
    adults: [0, Validators.required],
    dateOfDeparture: ['', Validators.required],
    dateOfReturn: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              private fs: FlightService) {
  }

  onSubmit(){
    const originValue = this.flightForm.get('origin')!.value;
    const destination = this.flightForm.get('destination')!.value;
    console.log(this.flightForm.value)
   if (originValue && destination){
     this.locations[0] = originValue;
     this.locations[1] = destination;
     this.locationsSender.emit(this.locations);
     this.fs.searchCodeForCity(originValue).subscribe((res: any)=>{
       this.flightForm.get('origin')?.setValue(res.data[0].address.cityCode)
       console.log(this.flightForm.get('origin')?.value);

       this.fs.searchCodeForCity(destination).subscribe((res: any)=>{
         this.flightForm.get('destination')?.setValue(res.data[0].address.cityCode)
         console.log(this.flightForm.get('destination')?.value);

         this.fs.showAvailableFlights(this.flightForm).subscribe((res: any)=>{
           this.availableFlights = res.data;
           console.log(res)
           console.log(this.availableFlights);
           this.flightsSender.emit(this.availableFlights);
         })
       });
     });




   }

  }
}
