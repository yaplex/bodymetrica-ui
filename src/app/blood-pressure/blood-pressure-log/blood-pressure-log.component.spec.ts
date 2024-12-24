import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPressureLogComponent } from './blood-pressure-log.component';

describe('BloodPressureComponent', () => {
  let component: BloodPressureLogComponent;
  let fixture: ComponentFixture<BloodPressureLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloodPressureLogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BloodPressureLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
