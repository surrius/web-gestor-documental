import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaGrupoSoporteComponent } from './busca-grupo-soporte.component';

describe('BuscaGrupoSoporteComponent', () => {
  let component: BuscaGrupoSoporteComponent;
  let fixture: ComponentFixture<BuscaGrupoSoporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaGrupoSoporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaGrupoSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
