import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/spinner.service';
declare var bootstrap: any
declare var WOW: any
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls:['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private spinner: SpinnerService,
  ) {
    this.spinner.loader(true);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    var myCarousel = document.querySelector('#carouselExampleSlidesOnly');
    new bootstrap.Carousel(myCarousel)
    console.log("object",WOW);
    new WOW().init();

    setTimeout(() => {
      this.spinner.loader(false);
    }, 1000);
  }

}
