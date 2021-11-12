import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaCotizacionesComponent } from './components/consulta-cotizaciones/consulta-cotizaciones.component';
import { FormsModule } from '@angular/forms';
import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
import { DetalleCotizacionComponent } from './components/detalle-cotizacion/detalle-cotizacion.component';
import { CreacionCotizacionComponent } from './components/creacion-cotizacion/creacion-cotizacion.component';



@NgModule({
  declarations: [
    ConsultaCotizacionesComponent,
    DetalleCotizacionComponent,
    CreacionCotizacionComponent
  ],
  imports: [
    CommonModule,
    CotizacionesRoutingModule,
    FormsModule
  ]
})
export class CotizacionesModule { }
