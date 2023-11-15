import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
declare var bootstrap: any;
declare var ScrollReveal: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor(private spinner: SpinnerService) {
    this.spinner.loader(true);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    ScrollReveal().reveal('.showAnimation');
    setTimeout(() => {
      this.spinner.loader(false);
    }, 1000);
  }
}
