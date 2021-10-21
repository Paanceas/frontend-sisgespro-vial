import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Sidebar } from '../models/Sidebar';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private session:boolean;
  private session$:Subject<boolean>;

  private sidebar:Sidebar[];
  private sidebar$:Subject<Sidebar[]>;

  constructor() {
    this.session = false;
    this.session$ = new Subject();

    this.sidebar = [];
    this.sidebar$ = new Subject();
  }

  updateSession(value:boolean){
    this.session = value;
    this.session$.next(this.session);
  }

  getSession$(): Observable<boolean>{
    return this.session$.asObservable();
  }

  updateSidebar(value:Sidebar[]){
    this.sidebar = value;
    this.sidebar$.next(this.sidebar);
  }
  getSidebar(){
    return this.sidebar;
  }
  getSidebar$(): Observable<Sidebar[]>{
    return this.sidebar$.asObservable();
  }

}
