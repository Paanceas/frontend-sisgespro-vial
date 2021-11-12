import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaAdquisicionComponent } from './components/consulta-adquisicion/consulta-adquisicion.component';
import { AdquisicionRoutingModule } from './adquisicion-routing.module';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    ConsultaAdquisicionComponent
  ],
  imports: [
    CommonModule,
    AdquisicionRoutingModule,
    ChartModule
  ]
})
export class AdquisicionModule { }
