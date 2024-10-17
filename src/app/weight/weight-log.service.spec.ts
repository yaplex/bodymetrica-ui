import { TestBed } from '@angular/core/testing';

import { WeightLogServiceService } from './weight-log.service';

describe('WeightLogServiceService', () => {
  let service: WeightLogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightLogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
