import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private api:ApiService
  ) { }

  getUsuarios(){
    return this.api.apiGet(environment.services.users);
  }
}
