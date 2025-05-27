import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../shared/models/user-profile.model';
import { Observable } from 'rxjs';
import { config } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${config.apiUri}/UserProfile`);
  }
  updateWeightUnits(updateWeightUnitsRequest: any): Observable<any> {
    return this.http.post(`${config.apiUri}/UserProfile/UpdateWeightUnits`, updateWeightUnitsRequest);
  }

}
