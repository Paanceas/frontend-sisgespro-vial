import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ProveedoresService } from '../../services/proveedores.service';
import Swal from 'sweetalert2';
import { ProveedorResponse } from '../../models/ProvedorResponse';
import { Util } from 'src/app/common/util';
import { ProveedoresResponse } from '../../models/ProveedoresResponse';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.css']
})
export class DetalleProveedorComponent implements OnInit {

  private subscription:Subscription;
  private id_proveedor:number = 0;
  private util:Util = new Util();

  listaMateriales:ProveedorResponse[] = [];
  proveedor:any;

  constructor(
    private rutaActiva: ActivatedRoute,
    private srv: ProveedoresService,
    private spinner: SpinnerService,
    private _router:Router,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription =  this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.id_proveedor = params.proveedor;
        this.proveedor = this.util.getObj("proveedor",true);
        if(!this.proveedor){
          this._router.navigate(["/proveedores/consulta"]);
        }
        console.log(this.proveedor);
        this.util.delObj("proveedor");
        this.getProveedor();
      }
    );
  }

  getProveedor(){
    this.spinner.loader(true);
    this.srv.getProveedor(this.id_proveedor)
    .subscribe(
      (data:any)=>{
        if(data && data.body && data.body.length>0){
          this.listaMateriales = data.body;
          console.log(this.listaMateriales);
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
