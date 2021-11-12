import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaProyectosComponent } from './consulta-proyectos.component';

describe('ConsultaProyectosComponent', () => {
  let component: ConsultaProyectosComponent;
  let fixture: ComponentFixture<ConsultaProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
