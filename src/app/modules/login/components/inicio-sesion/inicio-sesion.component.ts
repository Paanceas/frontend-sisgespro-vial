import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { SpinnerService } from 'src/app/services/spinner.service';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Util } from 'src/app/common/util';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  user: User = {
    password: '',
    roll: '',
    user: ''
  };

  private util: Util = new Util();
  private subscriptions: Subscription[] = [];


  constructor(
    private spinner: SpinnerService,
    private svc: LoginService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  private resetUser() {
    this.user = {
      password: '',
      roll: '',
      user: ''
    };
  }

  loadSesion() {
    this.spinner.loader(true);
    this.svc.login(this.user)
      .subscribe(
        (data: any) => {
          this.spinner.loader(false);
          if (data && data.status === 200) {
            if (data && data.body) {
              let usuarioL = data.body;
              if (usuarioL.estado === 0) {
                this.util.setObj("token", JSON.stringify('828fbcc651f82f21e0b6fc0c23a4f5c4'));
                this.util.setObj("usuario", JSON.stringify(usuarioL));
                Swal.fire('Usuario Exitoso', `El usuario ${this.user.user} se encuentra activo`, 'success');
              } else {
                Swal.fire('Usuario Inactivo', `El usuario ${this.user.user} se encuentra inactivo`, 'warning');
                this.resetUser();
              }
            } else {
              Swal.fire('Usuario no encontrado', `Revisa las credenciales para ${this.user.user}`, 'warning');
              this.resetUser();
            }
          } else {
            Swal.fire('Error', `No se encontro el usuario ${this.user.user}`, 'error');
            this.resetUser();
          }
        },
        err => {
          let msn = 'al ingresar al aplicativo!';
          console.error(err);
          if (err.error && err.error.message) {
            msn = err.error.message;
          }
          this.resetUser();
          this.spinner.loader(false);
          Swal.fire('Error', msn, 'error')
        }
      )
  }
}
