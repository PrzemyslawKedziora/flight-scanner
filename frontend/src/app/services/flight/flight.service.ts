import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_URL} from "../../API_URL";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  constructor(private http: HttpClient) { }

  searchCodeForCity(code: string){
    return this.http.get(API_URL+'/city-and-airport-search/'+code)
  }

  showAvailableFlights(form: FormGroup){
    let params = new HttpParams();
    params = params.append('originCode',form.get('origin')?.value);
    params = params.append('destinationCode',form.get('destination')?.value);
    params = params.append('dateOfDeparture',form.get('dateOfDeparture')?.value);
    if(form.get('dateOfReturn')?.value !== 'Invalid date'){
      params = params.append('dateOfReturn',form.get('dateOfReturn')?.value);
    }
    params = params.append('adults',form.get('adults')?.value);
    params = params.append('max',7);
    return this.http.get(API_URL+'/flight-search',{
      params: params
    });
  }
}
