import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAdquisicionComponent } from './crear-adquisicion.component';

describe('CrearAdquisicionComponent', () => {
  let component: CrearAdquisicionComponent;
  let fixture: ComponentFixture<CrearAdquisicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAdquisicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAdquisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
