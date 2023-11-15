import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaClientesComponent } from './components/consulta-clientes/consulta-clientes.component';
import { ClientesModuleRoutingModule } from './clientes-routing.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConsultaClientesComponent],
  imports: [CommonModule, ClientesModuleRoutingModule, NgbModalModule, FormsModule],
})
export class ClientesModule {}
