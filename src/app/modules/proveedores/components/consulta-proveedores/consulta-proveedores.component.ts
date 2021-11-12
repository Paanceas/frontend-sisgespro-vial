import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';
import { ProveedoresResponse } from '../../models/ProveedoresResponse';
import { ProveedoresService } from '../../services/proveedores.service';
import { Util } from 'src/app/common/util';

@Component({
  selector: 'app-consulta-proveedores',
  templateUrl: './consulta-proveedores.component.html',
  styleUrls: ['./consulta-proveedores.component.css']
})
export class ConsultaProveedoresComponent implements OnInit {

  constructor(
    private srv:ProveedoresService,
    private spinner: SpinnerService,
    private _router:Router,

  ) { }

  private util:Util = new Util();

  listaProveedores:ProveedoresResponse[] = [];

  ngOnInit(): void {
    this.getProveedores();
  }


  private getProveedores(){
    this.spinner.loader(true);
    this.srv.getProveedores()
    .subscribe(
      (data:any)=>{
        if(data && data.body && data.status === 200){
          this.listaProveedores = data.body;
        }
        this.spinner.loader(false);
      },
      err=>{
        let msn = 'al ingresar al aplicativo!';
        if (err.error && err.error.message) {
          msn = err.error.message;
        }
        this.spinner.loader(false);
        Swal.fire('Error', msn, 'error')
      }
    );
  }

  confirmDel(prov:ProveedoresResponse){
       Swal.fire({
        title: `¿Estas Seguro de eliminar el proveedor ${prov.nombre}?`,
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: `Sí eliminar`
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result);
        }
      })
  }

  detalle(prov:ProveedoresResponse){
    this.util.setObj('proveedor',JSON.stringify(prov));
    this._router.navigate(["/proveedores/detalle",prov.id_proveedor]);
  }
}
