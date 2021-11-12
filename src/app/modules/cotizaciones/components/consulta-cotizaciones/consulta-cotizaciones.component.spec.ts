import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCotizacionesComponent } from './consulta-cotizaciones.component';

describe('ConsultaCotizacionesComponent', () => {
  let component: ConsultaCotizacionesComponent;
  let fixture: ComponentFixture<ConsultaCotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaCotizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
