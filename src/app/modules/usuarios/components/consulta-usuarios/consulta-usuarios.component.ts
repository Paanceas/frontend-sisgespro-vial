import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';
import { UserResponse } from '../../models/UserResponse';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-consulta-usuarios',
  templateUrl: './consulta-usuarios.component.html',
  styleUrls: ['./consulta-usuarios.component.css']
})
export class ConsultaUsuariosComponent implements OnInit {

  constructor(
    private srv: UsuariosService,
    private spinner: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  listaUsuarios: UserResponse[] = []

  private getUsuarios() {
    this.spinner.loader(true);
    this.srv.getUsuarios()
      .subscribe(
        (data: any) => {
          if (data && data.body && data.status === 200) {
            this.listaUsuarios = data.body;
          }
          this.spinner.loader(false);
        },
        err => {
          let msn = 'al ingresar al cargar usuarios!';
          console.error(err);
          if (err.error && err.error.message) {
            msn = err.error.message;
          }
          this.spinner.loader(false);
          Swal.fire('Error', msn, 'error')
        }
      );
  }

}
