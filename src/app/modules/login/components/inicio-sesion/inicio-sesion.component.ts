import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  user:User = {
    password: '',
    roll: '',
    user: ''
  };

  constructor(private spinner:SpinnerService) { }

  ngOnInit(): void {
  }

  loadSesion(){
    this.spinner.loader(true);
    setTimeout(() => {
      this.spinner.loader(false);
    }, 3000);
  }
}
