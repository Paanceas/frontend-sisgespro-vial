import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpMethod } from '../common/enums/httpMethod.enum';

@Injectable({
  providedIn: 'root',
})
export class GlobalApiService {
  constructor(private api: ApiService) {}

  getPais() {
    return this.api.apiGet(HttpMethod.countries);
  }

  getDepartamentos(id_pais: number) {
    const params = `pais=${id_pais}`;
    return this.api.apiGet(HttpMethod.states, params);
  }

  getCiudades(id_departamento: number) {
    const params = `ubicacion=${id_departamento}`;
    return this.api.apiGet(HttpMethod.cities, params);
  }

  getTipoIdentificacion() {
    return this.api.apiGet(HttpMethod['type-ids']);
  }

  getTipoUnidadMedida() {
    return this.api.apiGet(HttpMethod['type-units']);
  }

  getCategoria() {
    return this.api.apiGet(HttpMethod.category);
  }

  getClientes() {
    return this.api.apiGet(HttpMethod.clients);
  }

  getMateriales() {
    return this.api.apiGet(HttpMethod.materials);
  }

  getEmpleados() {
    return this.api.apiGet(HttpMethod.employees);
  }

  getSummaryInfo() {
    return this.api.apiGet(HttpMethod['summary-info']);
  }

  getStatusProjects() {
    return this.api.apiGet(HttpMethod['status-projects']);
  }

  getQuotationData() {
    return this.api.apiGet(HttpMethod['quotation-data']);
  }
}
