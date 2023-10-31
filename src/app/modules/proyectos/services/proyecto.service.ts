import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/ProyectoRequest';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(
    private api: ApiService
  ) { }

  getProyectos() {
    return this.api.apiGet(environment.services.projects);
  }
  getProyecto(id_proyecto: number) {
    const params = `id_proyecto=${id_proyecto}`
    return this.api.apiGet(environment.services.project, params);
  }

  setProyecto(proyecto: Proyecto) {
    return this.api.apiPost(environment.services.project, proyecto);
  }

}
