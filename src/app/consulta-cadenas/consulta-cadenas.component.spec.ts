import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCadenasComponent } from './consulta-cadenas.component';

describe('ConsultaCadenasComponent', () => {
  let component: ConsultaCadenasComponent;
  let fixture: ComponentFixture<ConsultaCadenasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaCadenasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCadenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
