import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProyectoComponent } from './detalle-proyecto.component';

describe('DetalleProyectoComponent', () => {
  let component: DetalleProyectoComponent;
  let fixture: ComponentFixture<DetalleProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
