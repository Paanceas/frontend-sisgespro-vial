import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Adquisicion } from '../models/Adquisicion';
import { HttpMethod } from 'src/app/common/enums/httpMethod.enum';

@Injectable({
  providedIn: 'root'
})
export class AdquisicionService {


  constructor(
    private api: ApiService
  ) { }

  getAdquisiciones() {
    return this.api.apiGet(HttpMethod.acquisitions);
  }

  getAdquisicion(id_adquisicion: number) {
    const params = `id_adquisicion=${id_adquisicion}`
    return this.api.apiGet(HttpMethod.acquisition, params);
  }

  postAdquisicion(ad: Adquisicion) {
    return this.api.apiPost(HttpMethod.acquisition, ad);
  }
}
