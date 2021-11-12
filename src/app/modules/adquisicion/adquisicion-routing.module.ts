import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';
import { ConsultaAdquisicionComponent } from './components/consulta-adquisicion/consulta-adquisicion.component';

const routes: Routes = [
  {path:'consulta', component: ConsultaAdquisicionComponent, canActivate:[AccesoTokenGuard]},
  {path: '', redirectTo:'/adquisiciones/consulta', pathMatch:'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdquisicionRoutingModule {}
