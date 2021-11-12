import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Cotizacion } from '../models/Contizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {

  constructor(
    private api:ApiService
  ) { }

  getCotizaciones(){
    return this.api.apiGet(environment.services.quotations);
  }
  getCotizacion(id_cotizacion:number){
    const params = `cotizacion=${id_cotizacion}`
    return this.api.apiGet(environment.services.quotation,params);
  }

  postCotizacion(ad:Cotizacion){
    return this.api.apiPost(environment.services.quotation,ad);
  }

}
