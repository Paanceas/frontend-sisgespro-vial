import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdquisicionService {


  constructor(
    private api:ApiService
  ) { }

  getAdquisiciones(){
    return this.api.apiGet(environment.services.acquisitions);
  }
}
