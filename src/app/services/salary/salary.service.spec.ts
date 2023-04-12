import {TestBed} from '@angular/core/testing';

import {SalaryService} from './salary.service';

describe('SalaryService', () => {
  let service: SalaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('April', () => {
  //   expect(service.calculate(5000)).toEqual([]);
  // });
});
