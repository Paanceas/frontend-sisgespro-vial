import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaInventarioComponent } from './components/consulta-inventario/consulta-inventario.component';
import { InventarioRoutingModule } from './inventario-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConsultaInventarioComponent],
  imports: [CommonModule, InventarioRoutingModule, FormsModule],
})
export class InventarioModule {}
