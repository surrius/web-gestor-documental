import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsultaJobsComponent } from './form-consulta-jobs.component';

describe('FormConsultaJobsComponent', () => {
  let component: FormConsultaJobsComponent;
  let fixture: ComponentFixture<FormConsultaJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConsultaJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConsultaJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
