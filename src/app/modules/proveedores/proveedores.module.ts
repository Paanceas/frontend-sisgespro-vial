import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaProveedoresComponent } from './components/consulta-proveedores/consulta-proveedores.component';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { CrearProveedorComponent } from './components/crear-proveedor/crear-proveedor.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DetalleProveedorComponent } from './components/detalle-proveedor/detalle-proveedor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConsultaProveedoresComponent, CrearProveedorComponent, DetalleProveedorComponent],
  imports: [CommonModule, ProveedoresRoutingModule, DirectivesModule, FormsModule],
})
export class ProveedoresModule {}
