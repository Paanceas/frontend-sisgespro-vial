import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Util } from 'src/app/common/util';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AdquisicionService } from '../../services/adquisicion.service';
import Swal from 'sweetalert2';
import { AdquisicionResponse } from '../../models/AdquisicionResponse';

@Component({
  selector: 'app-detalle-adquisicion',
  templateUrl: './detalle-adquisicion.component.html',
  styleUrls: ['./detalle-adquisicion.component.css'],
})
export class DetalleAdquisicionComponent implements OnInit {
  private subscription: Subscription;
  private id_adquisicion: number = 0;
  private util: Util = new Util();

  listaMateriales: AdquisicionResponse[] = [];
  adquisicion: any;

  constructor(
    private rutaActiva: ActivatedRoute,
    private srv: AdquisicionService,
    private spinner: SpinnerService,
    private _router: Router
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.rutaActiva.params.subscribe((params: Params) => {
      this.id_adquisicion = params.adquisicion;
      this.adquisicion = this.util.getObj('adquisicion', true);
      if (!this.adquisicion) {
        this._router.navigate(['/adquisicion/consulta']);
      }
      this.util.delObj('adquisicion');
      this.getAdquisicion();
    });
  }

  getAdquisicion() {
    this.spinner.loader(true);
    this.srv.getAdquisicion(this.id_adquisicion).subscribe(
      (data: any) => {
        if (data && data.body && data.body.length > 0) {
          this.listaMateriales = data.body;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
