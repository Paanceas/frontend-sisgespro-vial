import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Util } from './common/util';
import { GlobalsService } from './services/globals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  session:boolean = false;
  private subscription:Subscription;
  private util:Util = new Util();

  constructor(
    private globalSvc:GlobalsService
  ){
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    if(!this.session){
      this.setUser();
    }
    this.subscription = this.globalSvc.getSession$().subscribe(session =>{
      this.session = session;
    });
  }

  setUser(){
    let u:any = this.util.getObj("usuario",true);
    if(u){
      this.session = true;
      this.globalSvc.updateSession(true);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
