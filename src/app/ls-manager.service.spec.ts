import { TestBed } from '@angular/core/testing';

import { LsManagerService } from './ls-manager.service';

describe('LsManagerService', () => {
  let service: LsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
