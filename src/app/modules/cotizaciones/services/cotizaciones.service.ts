import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Cotizacion } from '../models/Contizacion';
import { HttpMethod } from 'src/app/common/enums/httpMethod.enum';

@Injectable({
  providedIn: 'root',
})
export class CotizacionesService {
  constructor(private api: ApiService) {}

  getCotizaciones() {
    return this.api.apiGet(HttpMethod.quotations);
  }
  getCotizacion(id_cotizacion: number) {
    const params = `cotizacion=${id_cotizacion}`;
    return this.api.apiGet(HttpMethod.quotation, params);
  }

  postCotizacion(ad: Cotizacion) {
    return this.api.apiPost(HttpMethod.quotation, ad);
  }
}
