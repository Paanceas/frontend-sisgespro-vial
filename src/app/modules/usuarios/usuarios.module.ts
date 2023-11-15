import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaUsuariosComponent } from './components/consulta-usuarios/consulta-usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConsultaUsuariosComponent],
  imports: [CommonModule, UsuariosRoutingModule, DirectivesModule, NgbModalModule, FormsModule],
})
export class UsuariosModule { }
