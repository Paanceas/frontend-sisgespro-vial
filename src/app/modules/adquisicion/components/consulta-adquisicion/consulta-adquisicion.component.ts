import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AdquicisionesResponse } from '../../models/AdquicisionesResponse';
import { AdquisicionService } from '../../services/adquisicion.service';
import Swal from 'sweetalert2';
import { Util } from 'src/app/common/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-adquisicion',
  templateUrl: './consulta-adquisicion.component.html',
  styleUrls: ['./consulta-adquisicion.component.css'],
})
export class ConsultaAdquisicionComponent implements OnInit {
  constructor(
    private srv: AdquisicionService,
    private spinner: SpinnerService,
    private _router: Router
  ) {}

  private util: Util = new Util();
  listaAdquisicion: AdquicisionesResponse[] = [];
  char: any = {
    type: 'line',
    data: {
      labels: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  };

  pie: any = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  };

  ngOnInit(): void {
    this.getAdquisicion();
  }

  private getAdquisicion() {
    this.spinner.loader(true);
    this.srv.getAdquisiciones().subscribe(
      (data: any) => {
        if (data && data.body && data.status === 200) {
          this.listaAdquisicion = data.body;
          this.organizarFechas(this.listaAdquisicion);
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

  organizarFechas(lista: AdquicisionesResponse[]) {
    let anios: any[] = [];
    let dataChart: any[] = [];

    lista.forEach(el => {
      const [year, month, day] = el.fecha_adquisicion.split('-');
      let filtroAnio = anios.find(x => x.anio === year);
      if (!filtroAnio) {
        anios.push({ anio: year, data: [el] });
      } else {
        filtroAnio.data.push(el);
      }
    });

    anios.forEach(an => {
      let enero = 0;
      let febrero = 0;
      let marzo = 0;
      let abril = 0;
      let mayo = 0;
      let junio = 0;
      let julio = 0;
      let agosto = 0;
      let septiembre = 0;
      let octubre = 0;
      let noviembre = 0;
      let diciembre = 0;
      an.data.forEach((da: any) => {
        const [year, month, day] = da.fecha_adquisicion.split('-');
        switch (month) {
          case '01':
            enero++;
            break;
          case '02':
            febrero++;
            break;
          case '03':
            marzo++;
            break;
          case '04':
            abril++;
            break;
          case '05':
            mayo++;
            break;
          case '06':
            junio++;
            break;
          case '07':
            julio++;
            break;
          case '08':
            agosto++;
            break;
          case '09':
            septiembre++;
            break;
          case '10':
            octubre++;
            break;
          case '11':
            noviembre++;
            break;
          case '12':
            diciembre++;
            break;
        }
      });
      const color = this.util.getRandomColor();
      let obj = {
        label: an.anio,
        data: [enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre],
        borderColor: color,
        backgroundColor: color,
        fill: false,
      };
      dataChart.push(obj);
    });
    this.char.data.datasets = dataChart;
    this.gasto(anios);
  }

  gasto(dataChart: any[]) {
    let dataSet: any[] = [];
    let dataBack: any[] = [];
    dataChart.forEach((pie: any) => {
      let total = 0;
      this.pie.data.labels.push(pie.anio);
      pie.data.forEach((da: any) => {
        total += da.valor_total_adquisicion;
      });
      dataSet.push(total);
      dataBack.push(this.util.getRandomColor());
    });

    this.pie.data.datasets = [
      {
        label: 'gastos',
        data: dataSet,
        backgroundColor: dataBack,
      },
    ];
  }

  detalle(prov: AdquicisionesResponse) {
    this.util.setObj('adquisicion', JSON.stringify(prov));
    this._router.navigate(['/adquisiciones/detalle', prov.id_adquisicion]);
  }
}
