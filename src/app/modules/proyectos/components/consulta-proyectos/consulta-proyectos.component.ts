import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ProyectosResponse } from '../../models/ProyectosResponse';
import { ProyectoService } from '../../services/proyecto.service';
import Swal from 'sweetalert2';
import { Util } from 'src/app/common/util';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta-proyectos',
  templateUrl: './consulta-proyectos.component.html',
  styleUrls: ['./consulta-proyectos.component.css']
})
export class ConsultaProyectosComponent implements OnInit {

  constructor(
    private srv: ProyectoService,
    private spinner: SpinnerService,
    private _router:Router,
  ) { }

  private util:Util = new Util();
  showMap:boolean = false;

  map:any;
  loader = new Loader({
    apiKey: environment.key,
    version: "weekly"
  });

  listaProyectos:ProyectosResponse[] = [];

  ngOnInit(): void {
    this.getProyectos();
  }

  private getProyectos() {
    this.spinner.loader(true);
    this.srv.getProyectos()
      .subscribe(
        (data: any) => {
          if (data && data.body && data.status === 200) {
            this.listaProyectos = data.body;
          }
          this.spinner.loader(false);
        },
        err => {
          let msn = 'al ingresar al cargar usuarios!';
          console.error(err);
          if (err.error && err.error.message) {
            msn = err.error.message;
          }
          this.spinner.loader(false);
          Swal.fire('Error', msn, 'error')
        }
      );
  }

  cargarMap(pro:ProyectosResponse){
    this.spinner.loader(true);
    this.showMap = true;
    setTimeout(() => {
      this.loader.load().then(() => {
        this.initMap(pro);
      });
    }, 1000);
  }

  closeMap(){
    this.showMap = false;
  }

  initMap(pro:ProyectosResponse): void {
    const geo:any[] = JSON.parse(pro.geoposicion)
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 13,
        center: { lat: geo[0].lat, lng: geo[geo.length-1].lng },
        mapTypeId: "terrain",
      }
    );

    const flightPlanCoordinates = geo;
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    flightPath.setMap(map);
    this.spinner.loader(false);
  }


  detalle(prov:ProyectosResponse){
      this.util.setObj('proyecto',JSON.stringify(prov));
      this._router.navigate(["/proyectos/detalle",prov.id_proyecto]);
  }

}
