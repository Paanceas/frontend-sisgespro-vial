import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAdquisicionComponent } from './consulta-adquisicion.component';

describe('ConsultaAdquisicionComponent', () => {
  let component: ConsultaAdquisicionComponent;
  let fixture: ComponentFixture<ConsultaAdquisicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaAdquisicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAdquisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
