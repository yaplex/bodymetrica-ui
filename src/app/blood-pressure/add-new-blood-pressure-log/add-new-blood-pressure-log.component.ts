import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { UserProfile } from 'src/app/shared/models/user-profile.model';
import { BloodPressureService } from '../blood-pressure.service';

@Component({
    selector: 'app-add-new-blood-pressure-log',
    imports: [MatFormField, MatLabel, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule,
        ReactiveFormsModule, MatIcon, MatIconModule, MatButtonModule, SpinnerComponent],
    providers: [provideNativeDateAdapter()],
    templateUrl: './add-new-blood-pressure-log.component.html',
    styleUrl: './add-new-blood-pressure-log.component.scss'
})
export class AddNewBloodPressureLogComponent implements OnInit {
  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent;
  userProfile: UserProfile = new UserProfile();

  constructor(private fb: FormBuilder, private service: BloodPressureService, private router: Router, private storage: PersistenceService) { }
  ngOnInit(): void {
    this.userProfile = this.storage.loadUserProfile();

    this.form = this.fb.group({
      systolic: ['', [Validators.required, Validators.min(0)]],
      diastolic: ['', [Validators.required, Validators.min(0)]],
      pulse: ['', [Validators.required, Validators.min(0)]],
      recordDate: [new Date(), Validators.required]
    });
  }
  
  form: FormGroup = new FormGroup('');

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    return day <= new Date();
  };

  onSubmit() {
    if (this.form.valid) {
      this.spinner.show();

      console.log(this.form.value);
      this.service.addNewRecord(this.form.value).subscribe({
        next: (result) => {
          this.form.reset();
          console.debug(result);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.spinner.hide();
          this.router.navigate(['/blood-pressure']);
        }
      });
    }
  }
}
