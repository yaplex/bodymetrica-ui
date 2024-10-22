import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWeightLogComponent } from './add-new-weight-log.component';

describe('AddNewWeightLogComponent', () => {
  let component: AddNewWeightLogComponent;
  let fixture: ComponentFixture<AddNewWeightLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewWeightLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewWeightLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
