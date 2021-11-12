import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/common/util';
import { GlobalApiService } from 'src/app/services/global-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';
import { Proveedor } from '../../models/Proveedor';
import { ProveedoresService } from '../../services/proveedores.service';
@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent implements OnInit {

  constructor(
    private srvGlobal: GlobalApiService,
    private srvProveedor: ProveedoresService,
    private spinner: SpinnerService,
  ) { }


  private util:Util = new Util();
  proveedor:Proveedor = {
      id_tipo_identificacion: null,
      id_ciudad: null,
      nombre: '',
      identificacion: '',
      direccion: '',
      telefono: '',
      celular: '',
      correo: '',
  }

  id_pais:any = null;
  id_departamento:any = null;

  listaPaises:any[] = [];
  listaTipoIdentificacion:any[] = [];
  listaDepartamentos:any[] = [];
  listaCiudades:any[] = [];

  ngOnInit(): void {
    this.loadServices();
  }


  loadServices(){
    this.spinner.loader(true);
    this.cargaPaises();
  }

  cargaPaises(){
    this.srvGlobal.getPais().subscribe(
      (data:any)=>{
        if(data && data.body && data.body.length>0){
          this.listaPaises = data.body;
        }
        this.cargaTiposIdentificacion();
      },
      err=>this.errorShow(err)
    )
  }

  cargaDepartamentos(){
    this.id_departamento = null;
    this.proveedor.id_ciudad = null;
    this.srvGlobal.getDepartamentos(this.id_pais).subscribe(
      (data:any)=>{
        if(data && data.body && data.body.length>0){
          this.listaDepartamentos = data.body;
        }else{
          this.msnShow("No se encontrarón departamentos o estados para el pais seleccionado");
          this.id_pais = null;
          this.id_departamento = null;
          this.proveedor.id_ciudad = null;
        }
        this.spinner.loader(false);
      },
      err=>this.errorShow(err)
    )
  }


  cargaCiudades(){
    this.proveedor.id_ciudad = null;
    this.srvGlobal.getCiudades(this.id_departamento).subscribe(
      (data:any)=>{
        if(data && data.body && data.body.length>0){
          this.listaCiudades = data.body;
        }else{
          this.msnShow("No se encontrarón ciudades para el departamento o estado seleccionado");
          this.id_departamento = null;
          this.proveedor.id_ciudad = null;
        }
        this.spinner.loader(false);
      },
      err=>this.errorShow(err)
    )
  }


  cargaTiposIdentificacion(){
    this.srvGlobal.getTipoIdentificacion().subscribe(
      (data:any)=>{
        if(data && data.body && data.body.length>0){
          this.listaTipoIdentificacion = data.body;
        }
        this.spinner.loader(false);
      },
      err=>this.errorShow(err)
    )
  }

  msnShow(msn:string){
    Swal.fire('Información', msn, 'info')
  }

  resetProveedor(){
    this.proveedor = {
      id_tipo_identificacion: null,
      id_ciudad: null,
      nombre: '',
      identificacion: '',
      direccion: '',
      telefono: '',
      celular: '',
      correo: '',
    }
    this.id_pais = null;
    this.id_departamento = null;
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

  guardarProveedor(){
    if(this.util.validObject(this.proveedor)){
      this.spinner.loader(true);
      this.srvProveedor.postProveedor(this.proveedor)
      .subscribe(
        (data:any)=>{
          Swal.fire('Creación Exitosa', `Proveedor ${this.proveedor.nombre} creado exitosamente`, 'success');
          this.resetProveedor();
          this.spinner.loader(false);
        },
        err=> this.errorShow(err)
      );
    }
  }

}
