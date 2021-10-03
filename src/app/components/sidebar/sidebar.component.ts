import { Component, OnInit } from '@angular/core';
import { Sidebar } from 'src/app/models/Sidebar';
import * as roles from '../../common/roles.json';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  listSidebar:Sidebar[] = [
    {
      id:1,
      icon:"bx bx-lock",
      active:false,
      name:"Inventario",
      path:"/inventario",
      roles: roles.default,
      submenu:[]
    },
    {
      id:2,
      icon:"bx bx-run",
      active:false,
      name:"Inventario2",
      path:"/login",
      roles: roles.default,
      submenu:[]
    },
    {
      id:3,
      icon:"bx bx-mail-send",
      active:true,
      name:"Inventario3",
      path:"/inventario",
      roles: roles.default,
      submenu:[]
    },
    {
      id:4,
      icon:"bx bx-server",
      active:false,
      name:"Inventario4",
      path:"/inventario",
      roles: roles.default,
      submenu:[
        {
          name:'prueba',
          path:"/login"
        }
      ]
    }
  ];

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.showMenu();
  }

  showMenu(){
    const navbar:any = document.getElementById('navbar');
    navbar.classList.toggle('expander')
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

}
