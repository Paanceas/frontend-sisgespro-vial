import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(
    private api:ApiService
  ) { }

  getProveedores(){
    return this.api.apiGet('vendors');
  }

}
