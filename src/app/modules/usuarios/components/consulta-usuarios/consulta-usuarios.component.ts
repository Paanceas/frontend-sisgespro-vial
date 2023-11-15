import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';
import { UserResponse } from '../../models/UserResponse';
import { UsuariosService } from '../../services/usuarios.service';
import { Util, errorShow } from 'src/app/common/util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consulta-usuarios',
  templateUrl: './consulta-usuarios.component.html',
  styleUrls: ['./consulta-usuarios.component.css'],
})
export class ConsultaUsuariosComponent implements OnInit {
  constructor(
    private srv: UsuariosService,
    private spinner: SpinnerService,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  util: Util = new Util();
  usuario: UserResponse = {} as UserResponse;
  listaUsuarios: UserResponse[] = [];

  private getUsuarios() {
    this.spinner.loader(true);
    this.srv.getUsuarios().subscribe(
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
        Swal.fire('Error', msn, 'error');
      }
    );
  }

  confirmDel(user: UserResponse) {
    Swal.fire({
      title: `¿Estas Seguro de cambiar el estado del usuario ${user.nombre_usuario}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Sí cambiar estado!`,
    }).then(result => {
      if (result.isConfirmed) {
        const sessionUser: any = this.util.getObj('usuario', true);
        if (sessionUser.usuario === user.nombre_usuario) {
          Swal.fire('Error', `No puedes cambiar el estado de tu usuario`, 'error');
          return;
        }
        this.updStateUser(user);
      }
    });
  }

  updStateUser(user: UserResponse) {
    this.spinner.loader(true);
    this.srv.updStateUser(user.id_usuario, user.estado ? 0 : 1).subscribe(
      (data: any) => {
        if (data?.status === 200) {
          Swal.fire('Actualización Exitosa', `Usuario ${user.nombre_usuario} actualizado exitosamente`, 'success');
          this.getUsuarios();
        }
        this.spinner.loader(false);
      },
      err => errorShow(err, this.spinner)
    );
  }

  createUser(content: any) {
    this._modalService.open(content);
  }

  guardarUsuario() {
    this._modalService.dismissAll();
    if (!this.usuario.nombre_usuario || !this.usuario.clave || !this.usuario.tipo_roll) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }
    this.spinner.loader(true);
    this.srv.createUser(this.usuario).subscribe(
      (data: any) => {
        if (data?.status === 200) {
          Swal.fire('Creación Exitosa', `Usuario ${this.usuario.nombre_usuario} creado exitosamente`, 'success');
          this.getUsuarios();
          this.usuario = {} as UserResponse;
          this._modalService.dismissAll();
        } else {
          Swal.fire('Error', `${data?.message}`, 'error');
        }

        this.spinner.loader(false);
      },
      err => errorShow(err, this.spinner)
    );
  }
}
