import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuscaCadenasComponent } from './form-busca-cadenas.component';

describe('FormBuscaCadenasComponent', () => {
  let component: FormBuscaCadenasComponent;
  let fixture: ComponentFixture<FormBuscaCadenasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBuscaCadenasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuscaCadenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
