import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { InventarioMaterial } from '../../models/InventarioMaterial';
import { SpinnerService } from 'src/app/services/spinner.service';
import { errorShow } from 'src/app/common/util';

@Component({
  selector: 'app-consulta-inventario',
  templateUrl: './consulta-inventario.component.html',
  styleUrls: ['./consulta-inventario.component.css'],
})
export class ConsultaInventarioComponent implements OnInit {
  listaInventario: InventarioMaterial[] = []; // Reemplazar con tu tipo de datos
  listaInventarioFiltrada: InventarioMaterial[] = []; // Reemplazar con tu tipo de datos
  filtroCodigoMaterial: string = '';
  ordenActual: string = '';
  ordenAscendente: boolean = true;

  constructor(
    private spinner: SpinnerService,
    private inventarioService: InventarioService
  ) {}

  ngOnInit(): void {
    this.getInventario();
  }

  private getInventario() {
    this.spinner.loader(true);
    this.inventarioService.getInventario().subscribe(
      (data: any) => {
        if (data && data.body && data.status === 200) {
          this.listaInventario = data.body;
          this.listaInventarioFiltrada = data.body;
        }
        this.spinner.loader(false);
      },
      err => errorShow(err, this.spinner)
    );
  }

  aplicarFiltro() {
    if (this.filtroCodigoMaterial) {
      this.listaInventarioFiltrada = this.listaInventario.filter(item =>
        item.codigo_material.toLowerCase().includes(this.filtroCodigoMaterial.toLowerCase())
      );
    } else {
      this.listaInventarioFiltrada = [...this.listaInventario];
    }
  }
  resetFiltro() {
    this.filtroCodigoMaterial = '';
    this.aplicarFiltro();
  }

  ordenarPorColumna(columna: string) {
    if (this.ordenActual === columna) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.ordenActual = columna;
      this.ordenAscendente = true;
    }

    this.listaInventarioFiltrada.sort((a: any, b: any) => {
      if (a[columna] < b[columna]) {
        return this.ordenAscendente ? -1 : 1;
      }
      if (a[columna] > b[columna]) {
        return this.ordenAscendente ? 1 : -1;
      }
      return 0;
    });
  }
}
