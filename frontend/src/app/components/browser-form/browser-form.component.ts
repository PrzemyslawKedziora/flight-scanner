import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {FlightService} from "../../services/flight/flight.service";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatStartDate} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {provideMomentDateAdapter} from "@angular/material-moment-adapter";
import * as moment from 'moment';
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
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
  @Output() submitStatus: EventEmitter<boolean> = new EventEmitter();
  availableFlights!:Array<any>;
  locations:string[] = [];
  flightForm!: FormGroup;
  minDate = new Date();
  minReturnDate = new Date();
  constructor(private fb: FormBuilder,
              private fs: FlightService,
              private sb: MatSnackBar) {
    this.flightForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      adults: [1, [Validators.required,Validators.min(1),Validators.max(10)]],
      dateOfDeparture: [this.minDate,[Validators.required,this.dateValidator()]],
      dateOfReturn: '',
    });
  }

  onSubmit(formDirective: { resetForm: () => void; }){
    const originValue = this.flightForm.get('origin')!.value;
    const destination = this.flightForm.get('destination')!.value;
    const returnDate = this.flightForm.get('dateOfReturn');
    this.setFormattedData('dateOfDeparture');
    returnDate?.value !== '' ? this.setFormattedData('dateOfReturn'): returnDate?.setValue('');
   if (originValue && destination && this.flightForm.valid){
     this.flightsSender.emit([]);
     this.flightForm.valid ? this.submitStatus.emit(true) : this.submitStatus.emit(false);
     this.locations[0] = originValue;
     this.locations[1] = destination;
     this.locationsSender.emit(this.locations);
     try {
       this.fs.searchCodeForCity(originValue).subscribe((res: any)=>{
         this.flightForm.get('origin')?.setValue(res.data[0].address.cityCode)
         this.fs.searchCodeForCity(destination).subscribe((res: any)=>{
           this.flightForm.get('destination')?.setValue(res.data[0].address.cityCode)
           this.fs.showAvailableFlights(this.flightForm).subscribe((res: any)=>{
             this.availableFlights = res.data;
             this.flightsSender.emit(this.availableFlights);
             this.flightForm.reset({},{emitEvent: false});
             formDirective.resetForm();
             returnDate?.setValue('')
           })
         });
       });
     }catch (e){
       this.sb.open('An error has occured.Please,try again.','',{
         duration: 3000,
         panelClass: ['failed-snackBar']
       });
     }
   }
  }

  onSetDepartureDate() {
    const minDate = new Date(moment(this.flightForm.get('dateOfDeparture')!.value).format('YYYY-MM-DD'));
    this.minReturnDate = new Date(minDate.setDate(minDate.getDate()));
  }


  private setFormattedData(selector:string) {
    const date: moment.Moment = moment(this.flightForm.get(selector)!.value);
    const formattedDate: string = date.format('YYYY-MM-DD');
    return this.flightForm.get(selector)?.setValue(formattedDate);
  }
   private dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value = control.value;
      if (!value || value === 'Invalid date') {
        return { required: true };
      }
      return null;
    };
  }
}
