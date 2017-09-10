import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOperacionComponent } from './menu-operacion.component';

describe('MenuOperacionComponent', () => {
  let component: MenuOperacionComponent;
  let fixture: ComponentFixture<MenuOperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
