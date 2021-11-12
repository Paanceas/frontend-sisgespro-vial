import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';
import { ConsultaProyectosComponent } from './components/consulta-proyectos/consulta-proyectos.component';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { DetalleProyectoComponent } from './components/detalle-proyecto/detalle-proyecto.component';


const routes: Routes = [
  {path:'consulta', component: ConsultaProyectosComponent, canActivate:[AccesoTokenGuard]},
  {path:'creacion', component: CrearProyectoComponent, canActivate:[AccesoTokenGuard]},
  {path:'detalle/:proyecto', component: DetalleProyectoComponent, canActivate:[AccesoTokenGuard]},
  {path: '', redirectTo:'/proyectos/consulta', pathMatch:'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProyectosRoutingModule {}
