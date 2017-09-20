import { TestBed, inject } from '@angular/core/testing';

import { ComunicacionService } from './comunicacion.service';

describe('ComunicacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComunicacionService]
    });
  });

  it('should be created', inject([ComunicacionService], (service: ComunicacionService) => {
    expect(service).toBeTruthy();
  }));
});
