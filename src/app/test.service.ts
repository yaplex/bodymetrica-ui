import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  ping$() {
    return this.http.get(`${config.apiUri}/WeatherForecast`);
  }
}
