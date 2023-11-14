import { Component, OnInit } from '@angular/core';
import { GlobalApiService } from 'src/app/services/global-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CotizacionesService } from '../../services/cotizaciones.service';
import Swal from 'sweetalert2';
import { CotizacionesResponse } from '../../models/CotizacionesResponse';
import { Util, errorShow } from 'src/app/common/util';

@Component({
  selector: 'app-consulta-cotizaciones',
  templateUrl: './consulta-cotizaciones.component.html',
  styleUrls: ['./consulta-cotizaciones.component.css']
})
export class ConsultaCotizacionesComponent implements OnInit {

  constructor(
    private srvGlobal: GlobalApiService,
    private srv: CotizacionesService,
    private spinner: SpinnerService,
  ) { }

  private util: Util = new Util();
  listaTipoIdentificacion: any[] = [];
  private listaCotizaciones: CotizacionesResponse[] = [];
  cotizacionesSeleccionadas: CotizacionesResponse[] = [];
  id_tipo_identificacion: any = null;
  identificacion: any = '';


  ngOnInit(): void {
    this.cargaCotizaciones();
  }

  buscarCotizaciones() {
    this.cotizacionesSeleccionadas = this.listaCotizaciones.filter(c => c.identificacion === this.identificacion.toString() && c.tipo_identificacion === this.id_tipo_identificacion);
    if (this.cotizacionesSeleccionadas.length <= 0) {
      Swal.fire('Info', "No se encontraron cotizaciones para los datos ingresados", 'info')
      this.reset();
    }
  }

  reset() {
    this.identificacion = '';
    this.id_tipo_identificacion = null;
    this.cotizacionesSeleccionadas = [];
  }

  cargaCotizaciones() {
    this.spinner.loader(true);
    this.srv.getCotizaciones().subscribe(
      (data: any) => {
        if (data && data.body && data.body.length > 0) {
          this.listaCotizaciones = data.body;
        }
        this.cargaTiposIdentificacion();
      },
      err => errorShow(err, this.spinner)
    )
  }

  cargaTiposIdentificacion() {
    this.srvGlobal.getTipoIdentificacion().subscribe(
      (data: any) => {
        if (data && data.body && data.body.length > 0) {
          this.listaTipoIdentificacion = data.body;
        }
        this.spinner.loader(false);
      },
      err => errorShow(err, this.spinner)
    )
  }

  detalle(prov: CotizacionesResponse) {
    this.util.setObj('cotizacion', JSON.stringify(prov));
  }
}
