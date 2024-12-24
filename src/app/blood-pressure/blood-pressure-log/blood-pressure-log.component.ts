import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BloodPressureService } from '../blood-pressure.service';
import { BloodPressureLog } from '../blood-pressure-log.model';
import { DatePipe, DecimalPipe, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-blood-pressure-log',
  standalone: true,
  imports: [NgFor, MatCardModule, DatePipe, MatIconModule, MatButtonModule, RouterLink, SpinnerComponent],
  templateUrl: './blood-pressure-log.component.html',
  styleUrl: './blood-pressure-log.component.scss'
})
export class BloodPressureLogComponent implements AfterViewInit {
  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent;
  bloodPressureLogs: BloodPressureLog[] = [];

  constructor(private service: BloodPressureService) { }
  ngAfterViewInit(): void {
    this.spinner.show();

    this.service.getRecentRecords().subscribe({
      next: (data) => {
        console.info(data);
        this.bloodPressureLogs = data;
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
