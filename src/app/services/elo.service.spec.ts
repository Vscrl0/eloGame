import { TestBed } from '@angular/core/testing';

import { EloServiceService } from './elo-service.service';

describe('EloServiceService', () => {
  let service: EloServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EloServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
