import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Util } from 'src/app/common/util';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ProyectoResponse } from '../../models/ProyectoResponse';
import { ProyectoService } from '../../services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {

  private subscription:Subscription;
  private id_proyecto:number = 0;
  private util:Util = new Util();

  constructor(
    private rutaActiva: ActivatedRoute,
    private srv: ProyectoService,
    private spinner: SpinnerService,
    private _router:Router,
  ) {
    this.subscription = new Subscription();
  }

  listaEmpleados:ProyectoResponse[] = [];
  proyecto:any;

  ngOnInit(): void {
    this.subscription =  this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.id_proyecto = params.proyecto;
        this.proyecto = this.util.getObj("proyecto",true);
        if(!this.proyecto){
          this._router.navigate(["/proyectos/consulta"]);
        }
        console.log(this.proyecto);
        this.util.delObj("proyecto");
        this.getProyecto();
      }
    );
  }

  getProyecto(){
    this.spinner.loader(true);
    this.srv.getProyecto(this.id_proyecto)
    .subscribe(
      (data:any)=>{
        if(data && data.body && data.body.length>0){
          this.listaEmpleados = data.body;
          console.log(this.listaEmpleados);
        }
        this.spinner.loader(false);
      },
      err=>{
        let msn = 'Error!';
        console.error(err);
        if (err.error && err.error.message) {
          msn = err.error.message;
        }
        this.spinner.loader(false);
        Swal.fire('Error', msn, 'error')
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
