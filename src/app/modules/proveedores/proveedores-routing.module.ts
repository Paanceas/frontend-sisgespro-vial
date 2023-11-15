import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccesoTokenGuard } from 'src/app/guards/acceso-token.guard';
import { ConsultaProveedoresComponent } from './components/consulta-proveedores/consulta-proveedores.component';
import { CrearProveedorComponent } from './components/crear-proveedor/crear-proveedor.component';
import { DetalleProveedorComponent } from './components/detalle-proveedor/detalle-proveedor.component';
import { InformacionComponent } from '../principal/components/informacion/informacion.component';

const routes: Routes = [
  { path: '', redirectTo: '/proveedores/consulta', pathMatch: 'full' },
  { path: 'consulta', component: ConsultaProveedoresComponent, canActivate: [AccesoTokenGuard] },
  { path: 'creacion', component: CrearProveedorComponent, canActivate: [AccesoTokenGuard] },
  { path: 'detalle/:proveedor', component: DetalleProveedorComponent, canActivate: [AccesoTokenGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedoresRoutingModule {}
