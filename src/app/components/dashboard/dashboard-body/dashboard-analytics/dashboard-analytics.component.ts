import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import * as ApexCharts from 'apexcharts';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.css']
})
export class DashboardAnalyticsComponent implements OnInit, OnDestroy, AfterViewInit {

  // ? Atributos Charts
  dataCharts: any; // ! Todos los datos de los charts

  // ! data save service - first loading page
  dataChartArea: any = {
    date: '',
    total: 0
  };
  // ! data save service - first loading page
  dataChartPie: any;


  dataResChartPie: any;
  cantUsuariosTotales: number = 0;
  cantFacturasTotal: number = 0;
  cantProductosTotal: number = 0;
  today = new Date();




  // * CONSTRUCTOR
  constructor(
    private LoginService: LoginService,
    private ChartService: ChartService
  ) {
    this.ChartService.getDataCharts().subscribe(
      res => {
        this.dataCharts = res;
        this.createChartArea(this.dataCharts);
        this.ChartService.dataCharts = this.dataCharts;
      }
    )
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.ChartService.chartArea.destroy();
    this.ChartService.chartPie.destroy();
    this.ChartService.chartDonut.destroy();
    this.ChartService.chartRadar.destroy();
    this.ChartService.chartLine.destroy();
  }

  constructorChart(chartName: any, options: any): any {
    const chart = new ApexCharts(document.getElementById(chartName), options);
    chart.render();

    return chart;
  }


  /**
   * Chart Type Area | Facturacion por mes anual
   */
  createChartArea(data: any) {
    const dataChartArea = data[4].listTotalIngresosXMes;

    const optionsChartArea = {
      chart: {
        type: 'area',
        background: '#f5f5f5'
      },
      xaxis: {
        categories:
          ['Ene', 'Feb', 'Mar',
            'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep',
            'Oct', 'Nov', 'Dic']
      },
      yaxis: {
        labels: {
          formatter: (value: number) => `$${value}`
        }
      },
      series: dataChartArea.map(
        (item: any) => (
          {
            name: "Ingresos año " + item.name,
            data: item.data
          }
        )),
      colors: ['#f00d33', '#6875F5'],
    };

    const añoActual = new Date().getFullYear();
    const maxTotalAño = Math.max(
      ...dataChartArea
        .filter((item: any) => item.name === añoActual.toString())
        .map((item: any) => Math.max(...item.data))
    );

    this.dataChartArea = {
      date: añoActual,
      total: maxTotalAño
    }
    this.ChartService.chartArea = this.constructorChart('chartArea', optionsChartArea);

    // ! Creo el siguiente chart
    setTimeout(() => {
      this.generatePieChart(data);
    }, 500);

  }

  /**
   * Chart Type Pie | Top 5 Productos mas Vendidos
   */
  generatePieChart(data: any): void {
    const dataChartPie = data[3].listTop5ProductosMasVendidos;

    this.dataChartPie = dataChartPie;
    const resLabels = dataChartPie.map((item: any) => item.categoria);
    const resSeries = dataChartPie.map((item: any) => item.cantidad_vendida);

    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'pie',
        background: '#f5f5f5'
      },
      labels: resLabels,
      series: resSeries,
      colors: ['#ff0044', '#6875F5', '#FFCE56', '#4BC0C0', '#aa44ff'],
      dataLabels: {
        style: {
          colors: ['#000'],
        }
      }
    };

    this.ChartService.chartPie = new ApexCharts(document.getElementById('pieChart'), options);
    this.ChartService.chartPie.render();

    setTimeout(() => {
      this.createChartDonut(data);
    }, 700);

  }

  /**
   *  Chart Type Donut | Cantidad de Usuarios por Role
   */
  createChartDonut(data: any) {
    const dataChartDonut = data[1].listCantUserXRole;

    const options = {
      chart: {
        type: 'donut',
        background: '#f5f5f5'
      },
      labels: dataChartDonut.map((item: any) => item.name),
      series: dataChartDonut.map((item: any) => {
        this.cantUsuariosTotales += item.value;
        return item.value;
      }),
      colors: ['#f00d33', '#6875F5'],
      dataLabels: {
        style: {
          colors: ['#000'],
        }
      }
    };

    this.ChartService.chartDonut = this.constructorChart('chartDonut', options);

    setTimeout(() => {
      this.createChartRadar(data);
    }, 800);

  }

  createChartRadar(data: any) {
    const dataChartRadar = data[0].listAltaProductosXMes;

    const options = {
      chart: {
        type: 'radar',
        background: '#f5f5f5'
      },
      xaxis: {
        categories: [
          'Ene', 'Feb', 'Mar',
          'Abr', 'May', 'Jun',
          'Jul', 'Ago', 'Sep',
          'Oct', 'Nov', 'Dic']
      },
      series: dataChartRadar.map(
        (item: any) => {
          item.data.map((cant: any) => { this.cantProductosTotal += cant });
          return { name: item.name, data: item.data };
        }),
      colors: ['#6875F5', '#f00d33']
    };

    this.ChartService.chartRadar = this.constructorChart('chartRadar', options);

    setTimeout(() => {
      this.createChartLine(data);
    }, 900);

  }

  /**
   * Chart Type Line | Productos mas Vendidos por Mes
   */
  createChartLine(data: any) {
    const dataChartLine = data[2].listCantidadDeFacturasMes;


    const optionsChartLine = {
      chart: {
        type: 'line',
        background: '#f5f5f5'
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        labels: {
          style: {
            colors: '#000',
            fontSize: '14px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#000',
            fontSize: '14px'
          }
        }
      },
      series: dataChartLine.map(
        (item: any) => {
          item.data.map((cant: any) => { this.cantFacturasTotal += cant });
          return { name: item.name, data: item.data };
        }),
      colors: ['#f00d33', '#6875F5'],
    };

    this.ChartService.chartLine = this.constructorChart('chartLine', optionsChartLine);
  }

}
