import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {BrowserFormComponent} from "./components/browser-form/browser-form.component";
import {HttpClientModule} from "@angular/common/http";
import { FlightRecordComponent } from './components/flight-record/flight-record.component';


@NgModule({
  declarations: [
    AppComponent,
    FlightRecordComponent
  ],
  imports: [
    BrowserModule,
    BrowserFormComponent,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
