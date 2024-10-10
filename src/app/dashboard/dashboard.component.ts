import { Component, Inject } from '@angular/core';
import { AsyncPipe, DOCUMENT, NgIf } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { TestService } from '../test.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  profileJson: string = "";
  responseJson: string = "";
  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document, private api: TestService) { }
  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
  }
  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }

  testApi(){
    this.api.ping$().subscribe({
      next: (res) => {
        
        this.responseJson = JSON.stringify(res, null, 2).trim();
      },
      error: () => this.responseJson = "error",
    });
  }
}
