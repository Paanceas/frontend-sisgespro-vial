import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';
import { ConsultaUsuariosComponent } from './components/consulta-usuarios/consulta-usuarios.component';

const routes: Routes = [
  {path:'consulta', component: ConsultaUsuariosComponent, canActivate:[AccesoTokenGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule {}
