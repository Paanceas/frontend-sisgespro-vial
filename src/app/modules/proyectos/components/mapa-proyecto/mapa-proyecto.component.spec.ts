import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaProyectoComponent } from './mapa-proyecto.component';

describe('MapaProyectoComponent', () => {
  let component: MapaProyectoComponent;
  let fixture: ComponentFixture<MapaProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaProyectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
