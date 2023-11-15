import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdquisicionComponent } from './detalle-adquisicion.component';

describe('DetalleAdquisicionComponent', () => {
  let component: DetalleAdquisicionComponent;
  let fixture: ComponentFixture<DetalleAdquisicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleAdquisicionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdquisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
