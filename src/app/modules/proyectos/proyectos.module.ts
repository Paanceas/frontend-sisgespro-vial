import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaProyectosComponent } from './components/consulta-proyectos/consulta-proyectos.component';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { CrearProyectoComponent } from './components/crear-proyecto/crear-proyecto.component';
import { DetalleProyectoComponent } from './components/detalle-proyecto/detalle-proyecto.component';
import { MapaProyectoComponent } from './components/mapa-proyecto/mapa-proyecto.component';



@NgModule({
  declarations: [
    ConsultaProyectosComponent,
    CrearProyectoComponent,
    DetalleProyectoComponent,
    MapaProyectoComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule
  ]
})
export class ProyectosModule { }
