import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InformacionComponent } from './components/informacion/informacion.component';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ConsultaComponent } from './components/consulta/consulta.component';

const routes: Routes = [
  { path: '', component: InformacionComponent, canActivate: [AccesoTokenGuard] },
  { path: 'consulta/:search', component: ConsultaComponent, canActivate: [AccesoTokenGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent, canActivate: [AccesoTokenGuard] },
  { path: 'sisgespro', component: InformacionComponent, canActivate: [AccesoTokenGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalRoutingModule {}
