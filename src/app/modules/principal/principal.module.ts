import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacionComponent } from './components/informacion/informacion.component';
import { PrincipalRoutingModule } from './principal-routing.module';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ConsultaComponent } from './components/consulta/consulta.component';



@NgModule({
  declarations: [
    InformacionComponent,
    UnauthorizedComponent,
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule
  ]
})
export class PrincipalModule { }
