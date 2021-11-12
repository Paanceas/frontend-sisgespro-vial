import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../models/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(
    private api:ApiService
  ) { }

  getProveedores(){
    return this.api.apiGet(environment.services.vendors);
  }

  getProveedor(id_proveedor:number){
    const params = `id_proveedor=${id_proveedor}`
    return this.api.apiGet(environment.services.vendor,params);
  }

  postProveedor(proveedor:Proveedor){
    return this.api.apiPost(environment.services.vendor,proveedor);
  }

}
