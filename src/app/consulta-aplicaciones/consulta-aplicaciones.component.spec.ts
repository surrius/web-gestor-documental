import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAplicacionesComponent } from './consulta-aplicaciones.component';

describe('ConsultaAplicacionesComponent', () => {
  let component: ConsultaAplicacionesComponent;
  let fixture: ComponentFixture<ConsultaAplicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaAplicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAplicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
