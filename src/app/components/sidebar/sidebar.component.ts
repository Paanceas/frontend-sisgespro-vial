import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from 'src/app/common/util';
import { Sidebar } from 'src/app/models/Sidebar';
import { UserResponse } from 'src/app/models/User';
import { GlobalsService } from 'src/app/services/globals.service';
import * as modulos from '../../common/modulos.json';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() size = new EventEmitter();

  private util:Util = new Util();
  constructor(
    private _router:Router,
    private globalSvc:GlobalsService
  ) { }

  listSidebar:Sidebar[] = [];

  ngOnInit(): void {
    this.listSidebar = this.valideModules();
  }

  ngAfterContentInit(): void {
    this.showMenu();
  }

  showMenu(){
    const navbar:any = document.getElementById('navbar');
    navbar.classList.toggle('expander')
    this.size.emit(navbar.classList.contains('expander'));
  }

  openSubmenu(id:number){
    const collapseMenu:any = document.getElementById(`collapse__${id}`);
    const ulMenu = collapseMenu.nextElementSibling;
    ulMenu.classList.toggle('showCollapse')
    collapseMenu.classList.toggle('rotate');
    this.active(0);
  }

  active(id:number){
    this.listSidebar.forEach(element => {
      element.active = element.id === id ? true : false;
    });
  }

  closeSession(){
    this._router.navigate(["/inicio"]);
    window.sessionStorage.clear();
    this.globalSvc.updateSession(false);
  }

  valideModules(): Sidebar[]{
    const u:UserResponse = this.util.getObj("usuario",true);
    let newList:Sidebar[] = [];
    if(u){
      const list:Sidebar[] = modulos.default;
      newList = list.filter((m)=>{
        return m.roles.some((s:any) => s.name === u.roll);
      });
      newList.forEach((m:Sidebar) => {
         m.submenu = m.submenu.filter((s)=>{
          return s.roles.some((s:any) => s.name === u.roll);
        })
      });
    }
    console.log("newList",newList);
    this.globalSvc.updateSidebar(newList);
    return newList;
  }

}
