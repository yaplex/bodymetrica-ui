import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { WeightLogService } from '../weight-log/weight-log.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-add-new-weight-log',
  standalone: true,
  imports: [MatFormField, MatLabel, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule,
    ReactiveFormsModule, MatIcon, MatIconModule, MatButtonModule, SpinnerComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-new-weight-log.component.html',
  styleUrl: './add-new-weight-log.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewWeightLogComponent implements OnInit {
  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent;

  constructor(private fb: FormBuilder, private weightLogService: WeightLogService, private router: Router) { }
  ngOnInit(): void {
    this.addWeightForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(0)]],
      recordDate: [new Date(), Validators.required]
    });
  }
  readonly date = new FormControl(new Date());
  addWeightForm: FormGroup = new FormGroup('');

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    return day <= new Date();
  };

  onSubmit() {
    if (this.addWeightForm.valid) {
      this.spinner.show();

      console.log(this.addWeightForm.value);
      this.weightLogService.addNewRecord(this.addWeightForm.value).subscribe({
        next: (result) => {
          this.addWeightForm.reset();
          console.debug(result);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.spinner.hide();
          this.router.navigate(['/weight']);
        }
      });
    }
  }
}
