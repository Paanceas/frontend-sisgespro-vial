import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';
import { ConsultaClientesComponent } from './components/consulta-clientes/consulta-clientes.component';

const routes: Routes = [
  { path: 'consulta', component: ConsultaClientesComponent, canActivate: [AccesoTokenGuard] },
  { path: '', redirectTo: '/clientes/consulta', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesModuleRoutingModule {}
