import { TestBed } from '@angular/core/testing';

import { EmployeeformService } from './employeeform.service';

describe('EmployeeformService', () => {
  let service: EmployeeformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
