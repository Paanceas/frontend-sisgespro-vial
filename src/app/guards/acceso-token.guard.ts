import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,  Router} from '@angular/router';
import { Util } from '../common/util';

@Injectable({
  providedIn: 'root'
})
export class AccesoTokenGuard implements CanActivate {
  util:Util = new Util();
  constructor(private _router:Router){}

  canActivate(route:ActivatedRouteSnapshot):boolean{
    // console.log(route);
    const token = this.util.getObj("token");
    if(!token || token == null || token == ''){
      this._router.navigate(["/login"]);
      return false;
    }
    return true;
  }


}
