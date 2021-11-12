import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaCotizacionesComponent } from './components/consulta-cotizaciones/consulta-cotizaciones.component';
import { FormsModule } from '@angular/forms';
import { CotizacionesRoutingModule } from './cotizaciones-routing.module';



@NgModule({
  declarations: [
    ConsultaCotizacionesComponent
  ],
  imports: [
    CommonModule,
    CotizacionesRoutingModule,
    FormsModule
  ]
})
export class CotizacionesModule { }
