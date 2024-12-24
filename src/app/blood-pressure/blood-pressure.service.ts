import { Injectable } from '@angular/core';
import { BloodPressureLog } from './blood-pressure-log.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BloodPressureService {

  constructor(private http: HttpClient) { }

  getRecentRecords(): Observable<BloodPressureLog[]> {
    return this.http.get<BloodPressureLog[]>(`${config.apiUri}/BloodPressureLog`);
  }

  addNewRecord(weightLog: BloodPressureLog): Observable<BloodPressureLog> {
    return this.http.post<BloodPressureLog>(`${config.apiUri}/BloodPressureLog`, weightLog);
  }
}
