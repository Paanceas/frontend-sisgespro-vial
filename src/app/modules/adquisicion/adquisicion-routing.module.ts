import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';
import { ConsultaAdquisicionComponent } from './components/consulta-adquisicion/consulta-adquisicion.component';
import { CrearAdquisicionComponent } from './components/crear-adquisicion/crear-adquisicion.component';
import { DetalleAdquisicionComponent } from './components/detalle-adquisicion/detalle-adquisicion.component';

const routes: Routes = [
  { path: 'consulta', component: ConsultaAdquisicionComponent, canActivate: [AccesoTokenGuard] },
  { path: 'creacion', component: CrearAdquisicionComponent, canActivate: [AccesoTokenGuard] },
  { path: 'detalle/:adquisicion', component: DetalleAdquisicionComponent, canActivate: [AccesoTokenGuard] },
  { path: '', redirectTo: '/adquisiciones/consulta', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdquisicionRoutingModule {}
