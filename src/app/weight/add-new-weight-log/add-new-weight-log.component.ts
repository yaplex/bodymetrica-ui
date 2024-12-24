import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { WeightLogService } from '../weight-log.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { UserProfile } from 'src/app/shared/models/user-profile.model';
import { WeightConvertor } from '../weight-convertor.model';

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
  userProfile: UserProfile = new UserProfile();

  constructor(private fb: FormBuilder, private weightLogService: WeightLogService, private router: Router, private storage: PersistenceService) { }
  ngOnInit(): void {
    this.userProfile = this.storage.loadUserProfile();

    this.addWeightForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(0)]],
      recordDate: [new Date(), Validators.required]
    });
  }
   
  addWeightForm: FormGroup = new FormGroup('');

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    return day <= new Date();
  };

  onSubmit() {
    if (this.addWeightForm.valid) {
      this.spinner.show();

      console.log(this.addWeightForm.value);
      this.addWeightForm.value.weight = WeightConvertor.convertNumber(this.addWeightForm.value.weight, this.userProfile.weightUnits);
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
