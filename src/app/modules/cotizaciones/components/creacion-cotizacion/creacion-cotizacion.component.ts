import { Component, OnInit } from '@angular/core';
import { GlobalApiService } from 'src/app/services/global-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CotizacionesService } from '../../services/cotizaciones.service';
import Swal from 'sweetalert2';
import { Cotizacion } from '../../models/Contizacion';
import { Util, errorShow } from 'src/app/common/util';

@Component({
  selector: 'app-creacion-cotizacion',
  templateUrl: './creacion-cotizacion.component.html',
  styleUrls: ['./creacion-cotizacion.component.css'],
})
export class CreacionCotizacionComponent implements OnInit {
  constructor(
    private svcGlobal: GlobalApiService,
    private svc: CotizacionesService,
    private spinner: SpinnerService
  ) {}

  private util: Util = new Util();

  listaUnidadMedida: any[] = [];
  listaClientes: any[] = [];
  listaMateriales: any[] = [];

  valor_cotizacion: number = 0;
  totalNeto: number = 0;
  totalIva: number = 0;

  cotizacion: Cotizacion = {
    fecha_cotizacion: new Date().toISOString().substring(0, 10),
    id_cliente: null,
    iva: 0,
    materiales_cotizacion: [],
    nota_final: null,
    nota_inicio: null,
  };

  ngOnInit(): void {
    this.cargaUnidadMedida();
  }

  cargaUnidadMedida() {
    this.spinner.loader(true);
    this.svcGlobal.getTipoUnidadMedida().subscribe(
      (data: any) => {
        if (data && data.body && data.body.length > 0) {
          this.listaUnidadMedida = data.body;
        } else {
          Swal.fire('Información', 'No se encontrarón unidades de medida', 'info');
        }
        this.cargaClientes();
      },
      err => errorShow(err, this.spinner)
    );
  }
  cargaClientes() {
    this.svcGlobal.getClientes().subscribe(
      (data: any) => {
        if (data && data.body && data.body.length > 0) {
          this.listaClientes = data.body;
        } else {
          Swal.fire('Información', 'No se encontrarón Clientes', 'info');
        }
        this.cargaMateriales();
      },
      err => errorShow(err, this.spinner)
    );
  }
  cargaMateriales() {
    this.svcGlobal.getMateriales().subscribe(
      (data: any) => {
        if (data && data.body && data.body.length > 0) {
          this.listaMateriales = data.body;
        } else {
          Swal.fire('Información', 'No se encontrarón Materiales', 'info');
        }
        this.spinner.loader(false);
      },
      err => errorShow(err, this.spinner)
    );
  }

  calcularValores() {
    this.totalNeto = 0;
    this.cotizacion.materiales_cotizacion.forEach(mat => {
      this.totalNeto += mat.cantidad * mat.precio;
    });
    this.totalIva = (this.totalNeto * this.cotizacion.iva) / 100;
    this.valor_cotizacion = this.totalNeto + this.totalIva;
  }

  addRow() {
    this.cotizacion.materiales_cotizacion.push({
      cantidad: 0,
      descripcion: null,
      id_material: null,
      id_tipo_uni_medida: null,
      precio: 0,
    });
    this.calcularValores();
  }

  removeRow(key: any) {
    this.cotizacion.materiales_cotizacion.splice(key, 1);
    this.calcularValores();
  }

  resetCotizacion() {
    this.cotizacion = {
      fecha_cotizacion: new Date().toISOString().substring(0, 10),
      id_cliente: null,
      iva: 0,
      materiales_cotizacion: [],
      nota_final: null,
      nota_inicio: null,
    };
  }
  guardar() {
    if (this.util.validObject(this.cotizacion)) {
      let cont = 0;
      this.cotizacion.materiales_cotizacion.forEach(mat => {
        if (this.util.validObject(mat)) {
          cont++;
        }
      });
      if (cont === this.cotizacion.materiales_cotizacion.length) {
        this.spinner.loader(true);
        this.svc.postCotizacion(this.cotizacion).subscribe(
          (data: any) => {
            Swal.fire('Creación Exitosa', `Adquisicion creada exitosamente`, 'success');
            this.resetCotizacion();
            this.spinner.loader(false);
          },
          err => errorShow(err, this.spinner)
        );
      }
    }
  }

  cargaTipoUnidadMedida(mat: any) {
    let materialEncontrado = this.listaMateriales.find(material => material.id_material === mat.id_material);
    mat.id_tipo_uni_medida = materialEncontrado.id_tipo_uni_medida;
    mat.nombre_tipo_uni_medida = materialEncontrado.nombre_tipo_uni_medida;
  }
}
