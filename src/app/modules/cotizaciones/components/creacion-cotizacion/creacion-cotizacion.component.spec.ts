import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionCotizacionComponent } from './creacion-cotizacion.component';

describe('CreacionCotizacionComponent', () => {
  let component: CreacionCotizacionComponent;
  let fixture: ComponentFixture<CreacionCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionCotizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
