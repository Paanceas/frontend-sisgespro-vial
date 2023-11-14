import { Injectable } from '@angular/core';
import { Util } from 'src/app/common/util';
import { QuotationData } from '../models/quotationData.model';

interface MesCotizacion {
  mes: number;
  cantidad: number;
}

interface AnioCotizacion {
  anio: number;
  data: MesCotizacion[];
}

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  meses: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  private util: Util = new Util();

  public organizarCotizacionesParaGrafico(cotizaciones: QuotationData[]) {
    const aniosUnicos = Array.from(new Set(cotizaciones.map(c => c.anio)));
    const datasets: any = [];

    aniosUnicos.forEach(anio => {
      const datosMes = new Array(12).fill(0);
      cotizaciones.filter(c => c.anio === anio).forEach(cotizacion => {
        datosMes[cotizacion.mes - 1] = cotizacion.cantidad_cotizaciones;
      });

      const color = this.util.getRandomColor();
      datasets.push({
        label: anio.toString(),
        data: datosMes,
        borderColor: color,
        backgroundColor: color,
        fill: false,
      });
    });

    return {
      type: 'line',
      data: {
        labels: this.meses,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    };
  }
}
