import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private api: ApiService
  ) { }

  getClientes() {
    return this.api.apiGet(environment.services.clients);
  }
}
