import { TestBed, inject } from '@angular/core/testing';

import { BbddJobsService } from './bbdd-jobs.service';

describe('BbddJobsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BbddJobsService]
    });
  });

  it('should be created', inject([BbddJobsService], (service: BbddJobsService) => {
    expect(service).toBeTruthy();
  }));
});
