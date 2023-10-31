import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaClientesComponent } from './components/consulta-clientes/consulta-clientes.component';
import { ClientesModuleRoutingModule } from './clientes-routing.module';



@NgModule({
  declarations: [
    ConsultaClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesModuleRoutingModule
  ]
})
export class ClientesModule { }
