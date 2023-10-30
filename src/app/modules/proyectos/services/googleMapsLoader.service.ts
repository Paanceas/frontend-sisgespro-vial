// En app.module.ts o en un servicio compartido

import { Injectable } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {
  loader = new Loader({
    apiKey: environment.key,
    version: "weekly",
    libraries: ["drawing", "places", "maps"] // Añade aquí las bibliotecas necesarias
  });
}
