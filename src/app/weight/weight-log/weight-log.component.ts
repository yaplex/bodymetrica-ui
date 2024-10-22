import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { WeightLogService } from './weight-log.service';
import { WeightLog } from './weight-log.model';
import { DatePipe, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-weight-log',
  standalone: true,
  imports: [NgFor, MatCardModule, DatePipe, MatIconModule, MatButtonModule, RouterLink, SpinnerComponent],
  templateUrl: './weight-log.component.html',
  styleUrl: './weight-log.component.scss'
})
export class WeightLogComponent implements AfterViewInit {

  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent;

  weightLogs: WeightLog[] = [];

  constructor(private weightLogService: WeightLogService) { }
  
  ngAfterViewInit(): void {
    
    this.spinner.show();

    this.weightLogService.getRecentRecords().subscribe({
      next: (res) => {
        this.weightLogs = res;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

}
