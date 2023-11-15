import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Proveedor } from '../models/Proveedor';
import { HttpMethod } from 'src/app/common/enums/httpMethod.enum';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  constructor(private api: ApiService) {}

  getProveedores() {
    return this.api.apiGet(HttpMethod.vendors);
  }

  getProveedor(id_proveedor: number) {
    const params = `id_proveedor=${id_proveedor}`;
    return this.api.apiGet(HttpMethod.vendor, params);
  }

  postProveedor(proveedor: Proveedor) {
    return this.api.apiPost(HttpMethod.vendor, proveedor);
  }
}
