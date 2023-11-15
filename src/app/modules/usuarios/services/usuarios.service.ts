import { Injectable } from '@angular/core';
import { HttpMethod } from 'src/app/common/enums/httpMethod.enum';
import { ApiService } from 'src/app/services/api.service';
import { EncodingService } from 'src/app/services/encoding.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(
    private api: ApiService,
    private encode: EncodingService
  ) {}

  getUsuarios() {
    return this.api.apiGet(HttpMethod.users);
  }

  getRoles() {
    return this.api.apiGet(HttpMethod.roll);
  }

  updStateUser(id: number, state: number) {
    return this.api.apiPut(HttpMethod.user, {
      id_user: id,
      state,
    });
  }

  createUser(user: any) {
    user.clave = this.encode.encoding(user.clave);
    return this.api.apiPost(HttpMethod.user, user);
  }
}
