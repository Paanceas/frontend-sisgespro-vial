import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  apiGet(service:string, params?:string){
    return this.http.get(`${environment.apiUrl+service}${params ? '?'+params : ''}`);
  }

  apiPost(service:string, body:any){
    return this.http.post(`${environment.apiUrl+service}`,body);
  }

}
