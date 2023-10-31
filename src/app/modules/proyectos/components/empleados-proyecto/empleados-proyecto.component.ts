import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EmpleadoResponse } from 'src/app/modules/empleados/models/empleadosResponse';
import { GlobalApiService } from 'src/app/services/global-api.service';
import Swal from 'sweetalert2';
import { Empleado } from '../../models/ProyectoRequest';

@Component({
  selector: 'app-empleados-proyecto',
  templateUrl: './empleados-proyecto.component.html',
  styleUrls: ['./empleados-proyecto.component.css']
})
export class EmpleadosProyectoComponent implements OnInit {

  empleados: EmpleadoResponse[] = [];
  empleadosSeleccionados: EmpleadoResponse[] = [];
  indiceSeleccionado: number = -1;
  searchTerm: string = '';

  @Output() empleadosCambiados = new EventEmitter<Empleado[]>();
  @Input() resetSignal: boolean = false;


  constructor(
    private srvEmpleados: GlobalApiService,
  ) { }

  ngOnInit(): void {
    this.cargaEmpleados();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resetSignal && changes.resetSignal.currentValue === true) {
      this.empleadosSeleccionados = [];
      this.cargaEmpleados();
    }
  }

  cargaEmpleados() {
    this.srvEmpleados.getEmpleados().subscribe(
      (data: any) => {
        if (data && data.body && data.body.length > 0) {
          this.empleados = data.body;
        }
      },
      err => this.errorShow(err)
    )
  }

  errorShow(err: any) {
    let msn = 'Error!';
    console.error(err);
    if (err.error && err.error.message) {
      msn = err.error.message;
    }
    Swal.fire('Error', msn, 'error')
  }

  seleccionarConTeclado(event: KeyboardEvent) {
    const empleadosFiltrados = this.filtrarEmpleados();

    if (event.key === 'ArrowDown' && this.indiceSeleccionado < empleadosFiltrados.length - 1) {
      this.indiceSeleccionado++;
    } else if (event.key === 'ArrowUp' && this.indiceSeleccionado > 0) {
      this.indiceSeleccionado--;
    } else if (event.key === 'Enter' && this.indiceSeleccionado >= 0) {
      this.agregarEmpleado(empleadosFiltrados[this.indiceSeleccionado]);
      this.indiceSeleccionado = -1;
    }
  }

  agregarEmpleado(empleado: EmpleadoResponse) {
    this.empleadosSeleccionados.push(empleado);
    this.empleados = this.empleados.filter(e => e !== empleado);
    this.searchTerm = '';
    this.emitiendoEmpleadosSeleccionados();
  }

  eliminarEmpleado(empleado: EmpleadoResponse) {
    this.empleados.push(empleado);
    this.empleadosSeleccionados = this.empleadosSeleccionados.filter(e => e !== empleado);
  }

  emitiendoEmpleadosSeleccionados() {
    this.empleadosCambiados.emit(this.empleadosSeleccionados.map(e => ({ id_empleado: e.id_empleado })));
  }

  filtrarEmpleados(): EmpleadoResponse[] {
    if (!this.searchTerm.trim()) {
      return [];
    }
    return this.empleados.filter(empleado =>
      empleado.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
