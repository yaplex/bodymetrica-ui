import { Component, OnInit } from '@angular/core';
import { WeightLogService } from './weight-log.service';
import { WeightLog } from './weight-log.model';
import { DatePipe, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-weight',
  standalone: true,
  imports: [NgFor, MatCardModule, DatePipe, MatIconModule, MatButtonModule],
  templateUrl: './weight.component.html',
  styleUrl: './weight.component.scss'
})
export class WeightComponent implements OnInit {

  weightLogs: WeightLog[] = [];

  constructor(private weightLogService: WeightLogService) { }
  ngOnInit(): void {
    this.weightLogService.getRecentRecords().subscribe({
      next: (res) => {
        this.weightLogs = res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
