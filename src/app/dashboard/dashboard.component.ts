import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatCard, MatCardTitle, MatCardHeader, MatCardSubtitle, MatCardContent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor() { }
  
}
