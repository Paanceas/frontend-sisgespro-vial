import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';
import { ConsultaCotizacionesComponent } from './components/consulta-cotizaciones/consulta-cotizaciones.component';
import { DetalleCotizacionComponent } from './components/detalle-cotizacion/detalle-cotizacion.component';
import { CreacionCotizacionComponent } from './components/creacion-cotizacion/creacion-cotizacion.component';

const routes: Routes = [
  { path: 'consulta', component: ConsultaCotizacionesComponent, canActivate: [AccesoTokenGuard] },
  { path: 'creacion', component: CreacionCotizacionComponent, canActivate: [AccesoTokenGuard] },
  { path: 'detalle/:cotizacion', component: DetalleCotizacionComponent, canActivate: [AccesoTokenGuard] },
  { path: '', redirectTo: '/cotizaciones/consulta', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CotizacionesRoutingModule {}
