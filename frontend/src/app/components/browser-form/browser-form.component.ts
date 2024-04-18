import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FlightService} from "../../services/flight/flight.service";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatStartDate} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {provideMomentDateAdapter} from "@angular/material-moment-adapter";
import * as moment from 'moment';
import {MatButton} from "@angular/material/button";
export const MY_FORMATS = {
  parse: {
    dateInput: 'yyyy-MM-dd',
  },
  display: {
    dateInput: 'yyyy-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-browser-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatDatepicker,
    MatFormFieldModule,
    MatDatepickerInput,
    MatNativeDateModule,
    MatHint,
    MatDatepickerToggle,
    MatStartDate,
    MatButton
  ],
  providers:[
    provideMomentDateAdapter(MY_FORMATS)
  ],
  templateUrl: './browser-form.component.html',
  styleUrls: ['./browser-form.component.scss']
})
export class BrowserFormComponent {
  @Output() flightsSender: EventEmitter<Array<any>> = new EventEmitter();
  @Output() locationsSender: EventEmitter<string[]> = new EventEmitter();
  availableFlights!:Array<any>;
  locations:string[] = [];
  flightForm!: FormGroup;
  minDate = new Date();

  constructor(private fb: FormBuilder,
              private fs: FlightService) {
    this.flightForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      adults: ['', [Validators.required,Validators.min(1),Validators.max(10)]],
      dateOfDeparture: ['', Validators.required],
      dateOfReturn: '',
    });
  }

  onSubmit(){
    const originValue = this.flightForm.get('origin')!.value;
    const destination = this.flightForm.get('destination')!.value;
    this.setFormattedData('dateOfDeparture');
    this.setFormattedData('dateOfReturn');
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

  private setFormattedData(selector:string) {
    const date: moment.Moment = moment(this.flightForm.get(selector)!.value);
    const formattedDate: string = date.format('YYYY-MM-DD');
    return this.flightForm.get(selector)?.setValue(formattedDate);
  }
}
