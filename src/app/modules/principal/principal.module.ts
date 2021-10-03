import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacionComponent } from './components/informacion/informacion.component';
import { PrincipalRoutingModule } from './principal-routing.module';



@NgModule({
  declarations: [
    InformacionComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule
  ]
})
export class PrincipalModule { }
