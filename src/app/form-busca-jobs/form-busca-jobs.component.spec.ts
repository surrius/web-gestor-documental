import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuscaJobsComponent } from './form-busca-jobs.component';

describe('FormBuscaJobsComponent', () => {
  let component: FormBuscaJobsComponent;
  let fixture: ComponentFixture<FormBuscaJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBuscaJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuscaJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
