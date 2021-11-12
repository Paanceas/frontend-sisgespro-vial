import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Adquisicion } from '../models/Adquisicion';

@Injectable({
  providedIn: 'root'
})
export class AdquisicionService {


  constructor(
    private api:ApiService
  ) { }

  getAdquisiciones(){
    return this.api.apiGet(environment.services.acquisitions);
  }

  getAdquisicion(id_adquisicion:number){
    const params = `id_adquisicion=${id_adquisicion}`
    return this.api.apiGet(environment.services.acquisition,params);
  }

  postAdquisicion(ad:Adquisicion){
    return this.api.apiPost(environment.services.acquisition,ad);
  }
}
