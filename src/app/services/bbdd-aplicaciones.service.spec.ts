import { TestBed, inject } from '@angular/core/testing';

import { BbddAplicacionesService } from './bbdd-aplicaciones.service';

describe('BbddAplicacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BbddAplicacionesService]
    });
  });

  it('should be created', inject([BbddAplicacionesService], (service: BbddAplicacionesService) => {
    expect(service).toBeTruthy();
  }));
});
