import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaProveedoresComponent } from './consulta-proveedores.component';

describe('ConsultaProveedoresComponent', () => {
  let component: ConsultaProveedoresComponent;
  let fixture: ComponentFixture<ConsultaProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultaProveedoresComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
