import { TestBed } from '@angular/core/testing';

import { WeightLogService } from '../weight-log.service';

describe('WeightLogServiceService', () => {
  let service: WeightLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
