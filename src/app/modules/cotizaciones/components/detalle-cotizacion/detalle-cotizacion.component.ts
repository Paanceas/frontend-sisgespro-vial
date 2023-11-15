import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Util } from 'src/app/common/util';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CotizacionResponse } from '../../models/CotizacionResponse';
import { CotizacionesService } from '../../services/cotizaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-cotizacion',
  templateUrl: './detalle-cotizacion.component.html',
  styleUrls: ['./detalle-cotizacion.component.css'],
})
export class DetalleCotizacionComponent implements OnInit {
  private subscription: Subscription;
  private id_cotizacion: number = 0;
  private util: Util = new Util();

  listaMateriales: CotizacionResponse[] = [];
  cotizacion: any;
  valor_cotizacion: number = 0;

  totalNeto: number = 0;
  totalIva: number = 0;

  constructor(
    private rutaActiva: ActivatedRoute,
    private srv: CotizacionesService,
    private spinner: SpinnerService,
    private _router: Router
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.rutaActiva.params.subscribe((params: Params) => {
      this.id_cotizacion = params.cotizacion;
      this.cotizacion = this.util.getObj('cotizacion', true);
      if (!this.cotizacion) {
        this._router.navigate(['/cotizaciones/consulta']);
      }
      this.util.delObj('cotizacion');
      this.getCotizaciones();
    });
  }

  getCotizaciones() {
    this.spinner.loader(true);
    this.srv.getCotizacion(this.id_cotizacion).subscribe(
      (data: any) => {
        if (data && data.body && data.body.length > 0) {
          this.listaMateriales = data.body;
          this.calcularValores();
        }
        this.spinner.loader(false);
      },
      err => {
        let msn = 'Error!';
        console.error(err);
        if (err.error && err.error.message) {
          msn = err.error.message;
        }
        this.spinner.loader(false);
        Swal.fire('Error', msn, 'error');
      }
    );
  }

  calcularValores() {
    this.totalNeto = 0;
    this.listaMateriales.forEach(mat => {
      this.totalNeto += mat.cantidad * mat.precio;
    });
    this.totalIva = (this.totalNeto * this.cotizacion.iva) / 100;
    this.valor_cotizacion = this.totalNeto + this.totalIva;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
