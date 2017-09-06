import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAltaJobsComponent } from './form-alta-jobs.component';

describe('FormAltaJobsComponent', () => {
  let component: FormAltaJobsComponent;
  let fixture: ComponentFixture<FormAltaJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAltaJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAltaJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
