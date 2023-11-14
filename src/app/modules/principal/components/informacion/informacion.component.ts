import { Component, OnInit } from '@angular/core';
import { Util, errorShow } from 'src/app/common/util';
import { GlobalApiService } from 'src/app/services/global-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SummaryInfo } from '../../models/summaryInfo.model';
import { forkJoin } from 'rxjs';
import { StatusProjects } from '../../models/statusProjects.model';
import { PrincipalService } from '../../services/principal.service';
import { QuotationData } from '../../models/quotationData.model';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  private util: Util = new Util();
  summaryInfo: SummaryInfo = {} as SummaryInfo;
  statusProjects: StatusProjects[] = [];
  quotationData: QuotationData[] = [];
  currentYear = new Date().getFullYear();

  char: any = {
    type: 'line',
    data: {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }

  pie: any = {
    type: 'pie',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: true
    }
  }

  constructor(
    private _srv: GlobalApiService,
    private _spinner: SpinnerService,
    private _principal: PrincipalService

  ) { }

  ngOnInit(): void {
    this._spinner.loader(true);
    this.getServicesAnalytic();
  }

  setData(data: any) {
    if (data?.status === 200 && data?.body) {
      return data.body;
    } else {
      errorShow(null, this._spinner);
      return null;
    }
  }

  getStatusProjects(data: any) {
    if (data?.status === 200 && data?.body) {
      this.statusProjects = data.body;
    } else {
      errorShow(null, this._spinner)
    }
  }

  getServicesAnalytic() {
    forkJoin([
      this._srv.getSummaryInfo(),
      this._srv.getStatusProjects(),
      this._srv.getQuotationData(),

    ]).subscribe(([summaryInfo, statusProjects, quotationData]) => {
      this.summaryInfo = this.setData(summaryInfo);
      this.statusProjects = this.setData(statusProjects);
      this.quotationData = this.setData(quotationData);
      this.setDataAnalyticStatusProject();
      this.setDataAnalyticQuotation();
      this._spinner.loader(false);
    }, error => {
      errorShow(error, this._spinner)
    });
  }

  setDataAnalyticStatusProject() {
    let dataSet: any[] = [];
    let dataBack: any[] = [];
    this.statusProjects.forEach((pie: StatusProjects) => {
      this.pie.data.labels.push(pie.tipo_estado);
      dataSet.push(pie.cantidad_por_estado);
      dataBack.push(this.util.getRandomColor());
    });

    this.pie.data.datasets = [{
      label: "estados",
      data: dataSet,
      backgroundColor: dataBack
    }];
  }

  setDataAnalyticQuotation() {
    this.char = this._principal.organizarCotizacionesParaGrafico(this.quotationData);
  }

}
