import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Util } from '../common/util';

@Directive({
  selector: '[appRoll]'
})
export class RollDirective  implements OnInit  {

  private util:Util = new Util();
  constructor(private el:ElementRef, private renderer:Renderer2) { }

  ngOnInit(): void {
    let u:any = this.util.getObj("usuario",true);
    if(u){
      if(u.roll !== "Administrador"){
        this.renderer.setStyle(this.el.nativeElement,"display","none");
      }
    }else{
      this.renderer.setStyle(this.el.nativeElement,"display","none");
    }
  }

}
