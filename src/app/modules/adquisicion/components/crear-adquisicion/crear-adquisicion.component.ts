import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/common/util';
import { ProveedoresService } from 'src/app/modules/proveedores/services/proveedores.service';
import { GlobalApiService } from 'src/app/services/global-api.service';
import { Adquisicion } from '../../models/Adquisicion';
import { AdquisicionService } from '../../services/adquisicion.service';
import Swal from 'sweetalert2';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ProveedoresResponse } from 'src/app/modules/proveedores/models/ProveedoresResponse';

@Component({
  selector: 'app-crear-adquisicion',
  templateUrl: './crear-adquisicion.component.html',
  styleUrls: ['./crear-adquisicion.component.css']
})
export class CrearAdquisicionComponent implements OnInit {

  constructor(
    private svcProveedor:ProveedoresService,
    private svcGlobal:GlobalApiService,
    private svc:AdquisicionService,
    private spinner: SpinnerService,
  ) { }

  private util:Util = new Util();
  listaUnidadMedida:any[] = [];
  listaCategorias:any[] = [];
  proveedores:ProveedoresResponse[] = [];

  adquisicion:Adquisicion = {
    fecha_adquisicion : new Date().toISOString().substring(0, 10),
    valor_total_adquisicion: 0,
    materiales_adquisicion: []
  }

  ngOnInit(): void {
    this.cargaUnidadMedida();
  }

  cargaUnidadMedida(){
    this.spinner.loader(true);
    this.svcGlobal.getTipoUnidadMedida().subscribe(
      (data:any)=>{
        if(data && data.body && data.body.length>0){
          this.listaUnidadMedida = data.body;
        }else{
          Swal.fire('Información', "No se encontrarón unidades de medida", 'info')
        }
        this.cargaProveedores();
      },
      err=>this.errorShow(err)
    )
  }

  cargaProveedores(){
    this.svcProveedor.getProveedores().subscribe(
      (data:any)=>{
        if(data && data.body && data.body.length>0){
          this.proveedores = data.body;
        }else{
          Swal.fire('Información', "No se encontrarón proveedores", 'info')
        }
        this.cargaCategoria();
      },
      err=>this.errorShow(err)
    )
  }

  cargaCategoria(){
    this.svcGlobal.getCategoria().subscribe(
      (data:any)=>{
        if(data && data.body && data.body.length>0){
          this.listaCategorias = data.body;
        }else{
          Swal.fire('Información', "No se encontrarón Categorias", 'info')
        }
        this.spinner.loader(false);
      },
      err=>this.errorShow(err)
    )
  }

  addRow(){
    this.adquisicion.materiales_adquisicion.push({
      id_categoria: null,
      id_proveedor:null,
      id_tipo_uni_medida:null,
      cantidad_total: null,
      codigo_material: null,
      descripcion_material: null,
      nombre_material: null,
      precio_unitario: null
    })
  }

  removeRow(key:any){
    this.adquisicion.materiales_adquisicion.splice(key,1);
  }

  recalcular(){
    this.adquisicion.valor_total_adquisicion = 0;
    this.adquisicion.materiales_adquisicion.forEach(mat => {
      this.adquisicion.valor_total_adquisicion += (mat.cantidad_total || 0) * (mat.precio_unitario || 0);
    });
  }

  resetAdquisicion(){
    this.adquisicion = {
      fecha_adquisicion : new Date().toISOString().substring(0, 10),
      valor_total_adquisicion: 0,
      materiales_adquisicion: []
    }
  }

  guardar(){
    if(this.util.validObject(this.adquisicion)){
      let cont = 0;
      this.adquisicion.materiales_adquisicion.forEach(mat => {
        if(this.util.validObject(mat)){
          cont++;
        }
      });
      if(cont === this.adquisicion.materiales_adquisicion.length){
        this.svc.postAdquisicion(this.adquisicion)
        .subscribe(
          (data:any)=>{
            Swal.fire('Creación Exitosa', `Adquisicion creada exitosamente`, 'success');
            this.resetAdquisicion();
            this.spinner.loader(false);
          },
          err=> this.errorShow(err)
        );
      }
    }
  }

  errorShow(err:any){
    let msn = 'Error!';
    console.error(err);
    if (err.error && err.error.message) {
      msn = err.error.message;
    }
    this.spinner.loader(false);
    Swal.fire('Error', msn, 'error')
  }

}
