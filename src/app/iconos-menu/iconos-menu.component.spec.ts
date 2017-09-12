import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconosMenuComponent } from './iconos-menu.component';

describe('IconosMenuComponent', () => {
  let component: IconosMenuComponent;
  let fixture: ComponentFixture<IconosMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconosMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
