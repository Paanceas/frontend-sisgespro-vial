import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sidebar } from 'src/app/models/Sidebar';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  private subscription:Subscription;
  private subscriptionP:Subscription;
  private listSidebar:Sidebar[] = [];

  modules:Sidebar[] = [];
  search: string = "";

  constructor(
    private rutaActiva: ActivatedRoute,
    private globalSvc:GlobalsService
  ) {
    this.subscriptionP = new Subscription();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription =  this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.search = params.search;
        this.find();
      }
    );
    this.subscription = this.globalSvc.getSidebar$().subscribe(response =>{
      this.listSidebar = response;
      this.find();
    });
  }

  find(){
    this.listSidebar = this.globalSvc.getSidebar();
    console.log("response",this.listSidebar);
    if(this.listSidebar.length > 0){
      this.modules = this.valideModules(this.listSidebar, this.search);
    }else{
      this.modules = this.listSidebar;
    }
  }

  valideModules(list:Sidebar[], search:string): Sidebar[]{
    let newList:Sidebar[] = [];
    newList = list.filter((m)=>{
      return m.name.toLowerCase()
      .includes(search.toLowerCase());
    });
    return newList;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionP.unsubscribe();
  }

}
