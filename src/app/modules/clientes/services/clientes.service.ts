import { Injectable } from '@angular/core';
import { HttpMethod } from 'src/app/common/enums/httpMethod.enum';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private api: ApiService) {}

  getClientes() {
    return this.api.apiGet(HttpMethod.clients);
  }

  crearActualizarCliente(cliente: any) {
    return this.api.apiPost(HttpMethod.client, cliente);
  }
}
