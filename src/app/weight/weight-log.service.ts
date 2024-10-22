import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/environments/environment'
import { WeightLog } from './weight-log/weight-log.model';
import { Observable } from 'rxjs';
import { PersistenceService } from '../shared/services/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class WeightLogService {

  constructor(private http: HttpClient) { }

  getRecentRecords(): Observable<WeightLog[]> {
    return this.http.get<WeightLog[]>(`${config.apiUri}/WeightLog`);
  }

  addNewRecord(weightLog: WeightLog): Observable<WeightLog> {
    return this.http.post<WeightLog>(`${config.apiUri}/WeightLog`, weightLog);
  }
}
