import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalApiService {

  constructor(
    private api:ApiService
  ) { }

  getPais(){
    return this.api.apiGet(environment.services.countries);
  }

  getDepartamentos(id_pais:number){
    const params = `pais=${id_pais}`
    return this.api.apiGet(environment.services.states, params);
  }

  getCiudades(id_departamento:number){
    const params = `ubicacion=${id_departamento}`
    return this.api.apiGet(environment.services.cities, params);
  }

  getTipoIdentificacion(){
    return this.api.apiGet(environment.services['type-ids']);
  }

  getTipoUnidadMedida(){
    return this.api.apiGet(environment.services['type-units']);
  }

  getCategoria(){
    return this.api.apiGet(environment.services.category);
  }

  getClientes(){
    return this.api.apiGet(environment.services.clients);
  }

  getMateriales(){
    return this.api.apiGet(environment.services.materials);
  }

}
