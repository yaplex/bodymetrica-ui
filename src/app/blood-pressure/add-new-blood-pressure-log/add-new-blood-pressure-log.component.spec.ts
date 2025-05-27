import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBloodPressureLogComponent } from './add-new-blood-pressure-log.component';

describe('AddNewBloodPressureLogComponent', () => {
  let component: AddNewBloodPressureLogComponent;
  let fixture: ComponentFixture<AddNewBloodPressureLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewBloodPressureLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBloodPressureLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
