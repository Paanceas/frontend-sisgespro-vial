import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private session:boolean;
  private session$:Subject<boolean>;

  constructor() {
    this.session = false;
    this.session$ = new Subject();
  }

  updateSession(value:boolean){
    this.session = value;
    this.session$.next(this.session);
  }

  getSession$(): Observable<boolean>{
    return this.session$.asObservable();
  }

}
