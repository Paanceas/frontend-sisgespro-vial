import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ProyectosResponse } from '../../models/ProyectosResponse';
import { ProyectoService } from '../../services/proyecto.service';
import Swal from 'sweetalert2';
import { Util, errorShow } from 'src/app/common/util';
import { GoogleMapsLoaderService } from '../../services/googleMapsLoader.service';

@Component({
  selector: 'app-consulta-proyectos',
  templateUrl: './consulta-proyectos.component.html',
  styleUrls: ['./consulta-proyectos.component.css'],
})
export class ConsultaProyectosComponent implements OnInit {
  constructor(
    private srv: ProyectoService,
    private spinner: SpinnerService,
    private _router: Router,
    private googleMapsLoader: GoogleMapsLoaderService
  ) {}

  private util: Util = new Util();
  showMap: boolean = false;

  map: any;

  listaProyectos: ProyectosResponse[] = [];

  ngOnInit(): void {
    this.getProyectos();
  }

  private getProyectos() {
    this.spinner.loader(true);
    this.srv.getProyectos().subscribe(
      (data: any) => {
        if (data && data.body && data.status === 200) {
          this.listaProyectos = data.body;
        }
        this.spinner.loader(false);
      },
      err => errorShow(err, this.spinner)
    );
  }

  private getDisponibilidadMateriales(id_proyecto: number, id_estado: number) {
    this.spinner.loader(true);
    this.srv.getDisponibilidadMateriales(id_proyecto).subscribe(
      (data: any) => {
        if (!data.body) {
          Swal.fire(
            'Cambio de estado',
            'El estado del proyecto no se puede modificar porque no cuenta con materiales en la cotización',
            'warning'
          );
          this.spinner.loader(false);
          return;
        }
        if (data && data.body && data.status === 200) {
          const disponibilidad = data.body;
          const materialesNoDisponibles = disponibilidad.filter(
            (material: any) => material.cantidad_disponible < material.cantidad_necesaria
          );
          if (materialesNoDisponibles.length > 0) {
            let mensaje = 'Los siguientes materiales no tienen suficiente disponibilidad:\n';
            materialesNoDisponibles.forEach((material: any) => {
              mensaje += `${material.nombre_material} - ${material.codigo_material} (Necesario: ${material.cantidad_necesaria}, Disponible: ${material.cantidad_disponible})\n`;
            });
            Swal.fire('Error', mensaje, 'error');
          } else {
            this.updEstadoProyecto(id_proyecto, id_estado);
          }
        }
        this.spinner.loader(false);
      },
      err => errorShow(err, this.spinner)
    );
  }

  private updEstadoProyecto(id_proyecto: number, id_estado: number) {
    this.srv.updEstadoProyecto(id_proyecto, id_estado).subscribe(
      (data: any) => {
        if (data && data.status === 200) {
          Swal.fire('Cambio de estado', 'El estado del proyecto se cambio correctamente', 'success');
          this.getProyectos();
        } else {
          Swal.fire('Cambio de estado', 'El estado del proyecto no se pudo cambiar', 'error');
        }
        this.spinner.loader(false);
      },
      err => errorShow(err, this.spinner)
    );
  }

  cargarMap(pro: ProyectosResponse) {
    this.spinner.loader(true);
    this.showMap = true;
    setTimeout(() => {
      this.googleMapsLoader.loader.load().then(() => {
        this.initMap(pro);
      });
    }, 1000);
  }

  closeMap() {
    this.showMap = false;
  }

  initMap(pro: ProyectosResponse): void {
    const geo: any[] = JSON.parse(pro.geoposicion);
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: geo.length === 1 ? 17 : 13,
      center: { lat: geo[0].lat, lng: geo[geo.length - 1].lng },
      mapTypeId: 'terrain',
    });

    if (geo.length === 1) {
      const marker = new google.maps.Marker({
        position: { lat: geo[0].lat, lng: geo[0].lng },
        map: map,
        icon: 'assets/img/marker.png',
      });
    } else if (geo.length > 1) {
      const flightPlanCoordinates = geo;
      const flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FEEE04',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      flightPath.setMap(map);
    }
    this.spinner.loader(false);
  }

  detalle(prov: ProyectosResponse) {
    this.util.setObj('proyecto', JSON.stringify(prov));
    this._router.navigate(['/proyectos/detalle', prov.id_proyecto]);
  }

  confirmaCambiarEstado(pro: ProyectosResponse) {
    const nuevo_estado = pro.id_estado + 1;
    const estado = nuevo_estado === 1 ? 'POR INICIAR' : nuevo_estado === 2 ? 'EN EJECUCIÓN' : 'TERMINADO';
    if (nuevo_estado === 4) {
      return;
    }
    Swal.fire({
      title: `¿Estas Seguro de cambiar el estado del proyecto ${pro.nombre_proyecto}?`,
      text: `el estado del proyecto se cambiara a ${estado}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Sí cambiar estado!`,
    }).then(result => {
      if (result.isConfirmed) {
        this.cambiarEstado(pro, nuevo_estado);
      }
    });
  }
  cambiarEstado(pro: ProyectosResponse, nuevo_estado: number) {
    if (nuevo_estado === 2) {
      this.getDisponibilidadMateriales(pro.id_proyecto, nuevo_estado);
    } else {
      this.updEstadoProyecto(pro.id_proyecto, nuevo_estado);
    }
  }
}
