import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { EncodingService } from 'src/app/services/encoding.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private api:ApiService,
    private encode:EncodingService
  ) { }

  login(user:User){
    const params = `user=${user.user}&password=${this.encode.encoding(user.password)}`
    return this.api.apiGet(environment.services.user,params);
  }

}
