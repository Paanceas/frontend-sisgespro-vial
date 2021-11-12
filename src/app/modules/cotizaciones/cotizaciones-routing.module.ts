import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';
import { ConsultaCotizacionesComponent } from './components/consulta-cotizaciones/consulta-cotizaciones.component';


const routes: Routes = [
  {path:'consulta', component: ConsultaCotizacionesComponent, canActivate:[AccesoTokenGuard]},
  {path: '', redirectTo:'/cotizaciones/consulta', pathMatch:'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CotizacionesRoutingModule {}