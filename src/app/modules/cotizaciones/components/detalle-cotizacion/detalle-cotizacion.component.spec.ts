import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCotizacionComponent } from './detalle-cotizacion.component';

describe('DetalleCotizacionComponent', () => {
  let component: DetalleCotizacionComponent;
  let fixture: ComponentFixture<DetalleCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleCotizacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
