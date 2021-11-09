import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaProveedoresComponent } from './components/consulta-proveedores/consulta-proveedores.component';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { CrearProveedorComponent } from './components/crear-proveedor/crear-proveedor.component';
import { DirectivesModule } from 'src/app/directives/directives.module';



@NgModule({
  declarations: [
    ConsultaProveedoresComponent,
    CrearProveedorComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    DirectivesModule
  ]
})
export class ProveedoresModule { }
