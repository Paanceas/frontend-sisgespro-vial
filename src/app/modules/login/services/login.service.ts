import { Injectable } from '@angular/core';
import { HttpMethod } from 'src/app/common/enums/httpMethod.enum';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { EncodingService } from 'src/app/services/encoding.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private api: ApiService,
    private encode: EncodingService
  ) {}

  login(user: User) {
    const params = `user=${user.user}&password=${this.encode.encoding(user.password)}`;
    return this.api.apiGet(HttpMethod.user, params);
  }
}
