import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaJobsComponent } from './consulta-jobs.component';

describe('ConsultaJobsComponent', () => {
  let component: ConsultaJobsComponent;
  let fixture: ComponentFixture<ConsultaJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
