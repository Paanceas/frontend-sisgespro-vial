import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';
import { ConsultaInventarioComponent } from './components/consulta-inventario/consulta-inventario.component';

const routes: Routes = [
  { path: 'consulta', component: ConsultaInventarioComponent, canActivate: [AccesoTokenGuard] },
  { path: '**', redirectTo: '/sisgespro', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioRoutingModule {}
