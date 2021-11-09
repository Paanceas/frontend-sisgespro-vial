import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';
import { ConsultaProveedoresComponent } from './components/consulta-proveedores/consulta-proveedores.component';
import { CrearProveedorComponent } from './components/crear-proveedor/crear-proveedor.component';

const routes: Routes = [
  {path:'consulta', component: ConsultaProveedoresComponent, canActivate:[AccesoTokenGuard]},
  {path:'creacion', component: CrearProveedorComponent, canActivate:[AccesoTokenGuard]},
  {path: '**', redirectTo:'/sisgespro', pathMatch:'full'},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProveedoresRoutingModule {}
