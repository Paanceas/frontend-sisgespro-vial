import { Component, OnInit } from '@angular/core';
import { Empleado, Proyecto } from '../../models/ProyectoRequest';
import { CotizacionesResponse } from 'src/app/modules/cotizaciones/models/CotizacionesResponse';
import { CotizacionesService } from 'src/app/modules/cotizaciones/services/cotizaciones.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';
import { ProyectoService } from '../../services/proyecto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  polylinePath: google.maps.LatLng[] = [];
  resetMapSignal: boolean = false;
  proyecto: Proyecto = {} as Proyecto;

  listaCotizaciones: CotizacionesResponse[] = [];

  constructor(
    private srvCotizacion: CotizacionesService,
    private srvProyecto: ProyectoService,
    private spinner: SpinnerService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.cargaCotizaciones();
  }

  cargaCotizaciones() {
    this.spinner.loader(true);
    this.srvCotizacion.getCotizaciones().subscribe(
      (data: any) => {
        if (data && data.body && data.body.length > 0) {
          this.listaCotizaciones = data.body;
        }
        this.spinner.loader(false);
      },
      err => this.errorShow(err)
    )
  }

  triggerReset() {
    this.resetMapSignal = true;
    setTimeout(() => this.resetMapSignal = false, 0);
  }

  handlePathCreated(path: google.maps.LatLng[]): void {
    this.polylinePath = path;
    if (JSON.stringify(this.polylinePath).length > 1000) {
      Swal.fire('Error', "Superaste el limite de puntos a trazar", 'warning')
      return;
    }
    this.proyecto.geoposicion = JSON.stringify(this.polylinePath);
  }

  manejarCambioEmpleados(empleados: Empleado[]): void {
    this.proyecto.empleados_proyecto = empleados;
  }

  guardarProyecto() {
    if (!this.proyecto.geoposicion || this.proyecto.geoposicion.length <= 0) {
      Swal.fire('Atención', "No hay trazabilidad en el mapa", 'warning')
      return;
    }
    if (!this.proyecto.empleados_proyecto || this.proyecto.empleados_proyecto.length <= 0) {
      Swal.fire('Atención', "No hay empleados asignados en el proyecto", 'warning')
      return;
    }
    this.proyecto.id_estado = 1;
    this.enviarRegistro();
  }

  enviarRegistro() {
    this.spinner.loader(false);
    this.srvProyecto.setProyecto(this.proyecto).subscribe((data: any) => {
      if (data && data.status && data.status === 200) {
        Swal.fire('Registro exitoso', "Proyecto creado exitosamente", 'success');
        this._router.navigate(["/proyectos/consulta"]);
        this.proyecto = {} as Proyecto;
        this.triggerReset();
      }
      this.spinner.loader(false);
    },
      err => this.errorShow(err));
  }

  errorShow(err: any) {
    let msn = 'Error!';
    console.error(err);
    if (err.error && err.error.message) {
      msn = err.error.message;
    }
    this.spinner.loader(false);
    Swal.fire('Error', msn, 'error')
  }

}
