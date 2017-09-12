import { TestBed, inject } from '@angular/core/testing';

import { EnroutadorService } from './enroutador.service';

describe('EnroutadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnroutadorService]
    });
  });

  it('should be created', inject([EnroutadorService], (service: EnroutadorService) => {
    expect(service).toBeTruthy();
  }));
});
