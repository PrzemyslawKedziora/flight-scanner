import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {BrowserFormComponent} from "./components/browser-form/browser-form.component";
import {HttpClientModule} from "@angular/common/http";
import { FlightRecordComponent } from './components/flight-record/flight-record.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    FlightRecordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserFormComponent,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
