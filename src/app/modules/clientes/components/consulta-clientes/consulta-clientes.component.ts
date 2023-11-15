import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ClienteResponse } from '../../models/ClienteResponse'; // Asegúrate de que la ruta sea correcta
import { ClientesService } from '../../services/clientes.service'; // Asegúrate de que la ruta sea correcta
import { SpinnerService } from 'src/app/services/spinner.service';
import { Util, errorShow } from 'src/app/common/util';
import { GlobalApiService } from 'src/app/services/global-api.service';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['./consulta-clientes.component.css'],
})
export class ConsultaClientesComponent implements OnInit {
  util: Util = new Util();
  cliente: ClienteResponse = {} as ClienteResponse;
  listaClientes: ClienteResponse[] = [];
  tiposDoc: any[] = [];
  clienteSeleccionado: ClienteResponse = {} as ClienteResponse;

  constructor(
    private clientesService: ClientesService,
    private globalService: GlobalApiService,
    private spinner: SpinnerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerTipoDoc();
  }

  private obtenerClientes() {
    this.spinner.loader(true);
    this.clientesService.getClientes().subscribe(
      (data: any) => {
        if (data && data.body && data.status === 200) {
          this.listaClientes = data.body;
        }
        this.spinner.loader(false);
      },
      err => errorShow(err, this.spinner)
    );
  }

  private obtenerTipoDoc() {
    this.spinner.loader(true);
    this.globalService.getTipoIdentificacion().subscribe(
      (data: any) => {
        if (data && data.body && data.status === 200) {
          this.tiposDoc = data.body;
        }
        this.spinner.loader(false);
      },
      err => errorShow(err, this.spinner)
    );
  }

  abrirModalInfoCliente(content: any, cliente: ClienteResponse) {
    this.clienteSeleccionado = cliente;
    const modalRef = this.modalService.open(content);
  }

  abrirCrearEditarCliente(content: any, cliente?: ClienteResponse) {
    this.cliente = cliente ? { ...cliente } : ({} as ClienteResponse);
    this.modalService.open(content);
  }

  guardarCliente() {
    this.modalService.dismissAll();
    this.spinner.loader(true);
    this.cliente.id_cliente = this.cliente.id_cliente ? this.cliente.id_cliente : 0;
    this.clientesService.crearActualizarCliente(this.cliente).subscribe(
      (data: any) => {
        if (data?.status === 200) {
          Swal.fire('Operación Exitosa', `Cliente ${this.cliente.nombre} procesado exitosamente`, 'success');
          this.obtenerClientes();
        } else {
          Swal.fire('Error', `${data?.message}`, 'error');
        }
        this.spinner.loader(false);
      },
      err => errorShow(err, this.spinner)
    );
    console.log(
      '🚀 ~ file: consulta-clientes.component.ts:66 ~ ConsultaClientesComponent ~ guardarCliente ~ this.cliente:',
      this.cliente
    );
  }
}
