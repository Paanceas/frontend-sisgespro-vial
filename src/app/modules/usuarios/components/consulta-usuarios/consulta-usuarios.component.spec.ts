import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaUsuariosComponent } from './consulta-usuarios.component';

describe('ConsultaUsuariosComponent', () => {
  let component: ConsultaUsuariosComponent;
  let fixture: ComponentFixture<ConsultaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
