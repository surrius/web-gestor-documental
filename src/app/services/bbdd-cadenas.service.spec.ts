import { TestBed, inject } from '@angular/core/testing';

import { BbddCadenasService } from './bbdd-cadenas.service';

describe('BbddCadenasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BbddCadenasService]
    });
  });

  it('should be created', inject([BbddCadenasService], (service: BbddCadenasService) => {
    expect(service).toBeTruthy();
  }));
});
