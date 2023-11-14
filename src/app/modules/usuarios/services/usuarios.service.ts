import { Injectable } from '@angular/core';
import { HttpMethod } from 'src/app/common/enums/httpMethod.enum';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private api: ApiService
  ) { }

  getUsuarios() {
    return this.api.apiGet(HttpMethod.users);
  }
}
