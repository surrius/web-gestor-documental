import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAltaAplicacionesComponent } from './form-alta-aplicaciones.component';

describe('FormAltaAplicacionesComponent', () => {
  let component: FormAltaAplicacionesComponent;
  let fixture: ComponentFixture<FormAltaAplicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAltaAplicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAltaAplicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
