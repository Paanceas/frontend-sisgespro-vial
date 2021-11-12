import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,  Router, RouterStateSnapshot} from '@angular/router';
import { Util } from '../common/util';
import { UserResponse } from '../models/User';
import * as modulos from '../common/modulos.json';
import { Sidebar } from '../models/Sidebar';

@Injectable({
  providedIn: 'root'
})
export class AccesoTokenGuard implements CanActivate {
  util:Util = new Util();
  constructor(private _router:Router){}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    const unauthorized = "/sisgespro/unauthorized";
    const token = this.util.getObj("token");
    if(!token || token == null || token == ''){
      this._router.navigate(["/login"]);
      return false;
    }else{
      if(this.valideModules(state)){
        return true;
      }else{
        if(unauthorized !== state.url){
          this._router.navigate(["/sisgespro/unauthorized"]);
        }
        return false;
      }
    }
  }

  valideModules(state:RouterStateSnapshot): boolean{
    const u:UserResponse = this.util.getObj("usuario",true);
    let status:boolean = false;
    if(u){
      if(this.validaPath(state)){
        const list:Sidebar[] = modulos.default;
        list.forEach((m:Sidebar) => {
           if(m.path === state.url){
            status = m.roles.some((s:any) => s.name === u.roll)
           }else{
             if (m.submenu.length > 0){
               m.submenu.forEach(s => {
                 if(s.path ===state.url){
                  status = s.roles.some((s:any) => s.name === u.roll)
                 }
               });
             }
           }
        });
      }else{
        status = true;
      }
    }
    // console.log(state.url);
    // console.log(status);
    return status;
  }

  validaPath(state:RouterStateSnapshot){
    const lista:any[] = modulos.default;
    let valid = true;
    lista.forEach(route => {
      if(!state.url.includes(route.path)){
        valid = false;
      }
    });
    return valid;
  }



}
