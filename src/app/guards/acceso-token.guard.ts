import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Util } from '../common/util';
import { UserResponse } from '../models/User';
import * as modulos from '../common/modulos.json';
import * as rawData from '../common/pathValid.json';
import { Sidebar } from '../models/Sidebar';

@Injectable({
  providedIn: 'root',
})
export class AccesoTokenGuard implements CanActivate {
  util: Util = new Util();
  unauthorizedRoutes: string[] = rawData.default.map((item: any) => item.path);

  constructor(private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.util.getObj('token');
    if (!token || token == null || token == '') {
      this._router.navigate(['/login']);
      return false;
    } else {
      if (this.valideModules(state)) {
        return true;
      } else {
        if (!this.isUrlUnauthorized(state.url)) {
          this._router.navigate(['/sisgespro/unauthorized']);
        }
        return false;
      }
    }
  }

  valideModules(state: RouterStateSnapshot): boolean {
    const u: UserResponse = this.util.getObj('usuario', true);
    let status: boolean = false;
    if (u) {
      status = this.validAccess(state, u.roll);
    }
    return status;
  }

  validAccess(state: RouterStateSnapshot, rol: string): boolean {
    if (this.isUrlUnauthorized(state.url)) {
      return true;
    }
    const list: Sidebar[] = modulos.default;
    let hasAccess: boolean = false;
    list.forEach((module: Sidebar) => {
      if (module.path === state.url) {
        hasAccess = module.roles.some((role: any) => role.name === '*' || role.name === rol);
      } else if (module.submenu.length > 0) {
        module.submenu.forEach(submodule => {
          if (submodule.path === state.url) {
            hasAccess = submodule.roles.some((role: any) => role.name === '*' || role.name === rol);
          }
        });
      }
    });
    return hasAccess;
  }

  private isUrlUnauthorized(url: string): boolean {
    return this.unauthorizedRoutes.some(unauthorizedRoute => url.startsWith(unauthorizedRoute));
  }

  validaPath(state: RouterStateSnapshot) {
    const lista: any[] = modulos.default;
    let valid = true;
    lista.forEach(route => {
      if (!state.url.includes(route.path)) {
        valid = false;
      }
    });
    return valid;
  }
}
