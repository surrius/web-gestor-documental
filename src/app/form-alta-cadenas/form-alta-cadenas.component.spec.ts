import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAltaCadenasComponent } from './form-alta-cadenas.component';

describe('FormAltaCadenasComponent', () => {
  let component: FormAltaCadenasComponent;
  let fixture: ComponentFixture<FormAltaCadenasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAltaCadenasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAltaCadenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
