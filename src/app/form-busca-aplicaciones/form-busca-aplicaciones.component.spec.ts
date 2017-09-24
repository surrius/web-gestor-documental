import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuscaAplicacionesComponent } from './form-busca-aplicaciones.component';

describe('FormBuscaAplicacionesComponent', () => {
  let component: FormBuscaAplicacionesComponent;
  let fixture: ComponentFixture<FormBuscaAplicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBuscaAplicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuscaAplicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
