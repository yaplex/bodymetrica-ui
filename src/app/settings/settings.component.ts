import { AfterViewInit, Component, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { UserProfileService } from './user-profile.service';
import { PersistenceService } from '../shared/services/persistence.service';
import { UserProfile } from '../shared/models/user-profile.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatDivider, MatIcon, MatButtonToggleModule, SpinnerComponent, FormsModule, MatIcon, MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements AfterViewInit {
  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent;
  userProfile: UserProfile = new UserProfile();
  constructor(private userProfileService: UserProfileService, private storage: PersistenceService, private auth: AuthService, @Inject(DOCUMENT) private doc: Document) { }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }

  ngAfterViewInit(): void {
    this.spinner.show();

    this.userProfileService.getUserProfile().subscribe({
      next: (userProfile) => {
        this.userProfile = userProfile;
        this.storage.saveUserProfile(userProfile);
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

  updateWeightUnits(event: MatButtonToggleChange): void {
    console.log(event);
    this.userProfile.weightUnits = event.value;
    this.storage.updateWith({ weightUnits: event.value });
    this.userProfileService.updateWeightUnits({weightUnits: event.value}).subscribe({});    
  }
}
