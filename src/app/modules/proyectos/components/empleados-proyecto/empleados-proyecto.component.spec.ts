import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosProyectoComponent } from './empleados-proyecto.component';

describe('EmpleadosProyectoComponent', () => {
  let component: EmpleadosProyectoComponent;
  let fixture: ComponentFixture<EmpleadosProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpleadosProyectoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpleadosProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
