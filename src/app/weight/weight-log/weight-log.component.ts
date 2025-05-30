import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { WeightLogService } from '../weight-log.service';
import { WeightLog } from './weight-log.model';
import { DatePipe, DecimalPipe, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { WeightConvertor } from '../weight-convertor.model';
import { UserProfile } from 'src/app/shared/models/user-profile.model';
import { UserProfileService } from 'src/app/settings/user-profile.service';

@Component({
    selector: 'app-weight-log',
    imports: [NgFor, MatCardModule, DatePipe, MatIconModule, MatButtonModule, RouterLink, SpinnerComponent, DecimalPipe],
    templateUrl: './weight-log.component.html',
    styleUrl: './weight-log.component.scss'
})
export class WeightLogComponent implements AfterViewInit, OnInit {

  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent;

  weightLogs: WeightLog[] = [];
  userProfile: UserProfile = new UserProfile();

  constructor(private weightLogService: WeightLogService, private storage: PersistenceService, private userProfileService: UserProfileService) { }
  ngOnInit(): void {
    this.userProfile = this.storage.loadUserProfile();

    if (null == this.userProfile) {
      this.userProfileService.getUserProfile().subscribe({
        next: (userProfile) => {
          this.userProfile = userProfile;
          this.storage.saveUserProfile(userProfile);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
        }
      });
    }
  }

  ngAfterViewInit(): void {


    this.spinner.show();

    this.weightLogService.getRecentRecords().subscribe({
      next: (res) => {
        this.weightLogs = WeightConvertor.convertWeightLogArray(res, this.userProfile.weightUnits);
      },
      error: (error) => {
        console.error(error);
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

}
