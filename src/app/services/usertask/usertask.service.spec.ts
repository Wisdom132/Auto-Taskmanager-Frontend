import { TestBed } from '@angular/core/testing';

import { UsertaskService } from './usertask.service';

describe('UsertaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsertaskService = TestBed.get(UsertaskService);
    expect(service).toBeTruthy();
  });
});
