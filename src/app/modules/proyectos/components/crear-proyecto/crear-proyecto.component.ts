import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  constructor() { }

  map:any;
  loader = new Loader({
    apiKey: environment.key,
    version: "weekly"
  });

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  }



}
