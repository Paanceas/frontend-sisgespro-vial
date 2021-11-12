import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaAdquisicionComponent } from './components/consulta-adquisicion/consulta-adquisicion.component';
import { AdquisicionRoutingModule } from './adquisicion-routing.module';
import { ChartModule } from 'angular2-chartjs';
import { CrearAdquisicionComponent } from './components/crear-adquisicion/crear-adquisicion.component';
import { DetalleAdquisicionComponent } from './components/detalle-adquisicion/detalle-adquisicion.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConsultaAdquisicionComponent,
    CrearAdquisicionComponent,
    DetalleAdquisicionComponent
  ],
  imports: [
    CommonModule,
    AdquisicionRoutingModule,
    ChartModule,
    FormsModule
  ]
})
export class AdquisicionModule { }
