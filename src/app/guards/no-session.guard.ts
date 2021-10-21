import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Util } from '../common/util';
import * as paths  from '../common/pathNoSession.json';

@Injectable({
  providedIn: 'root'
})
export class NoSessionGuard implements CanActivate {
  util:Util = new Util();
  constructor(private _router:Router,){}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    const pathList:any[] = paths.default;
    const search = pathList.find(x => x.path === state.url);
    if(search && this.setUser()){
      this._router.navigate(["/sisgespro"]);
      return false;
    }
    return true;
  }

  setUser(){
    let u:any = this.util.getObj("usuario",true);
    if(u){
      return true;
    }
    return false;
  }
}
