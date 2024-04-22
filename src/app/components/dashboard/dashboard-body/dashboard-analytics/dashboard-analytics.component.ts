import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import * as ApexCharts from 'apexcharts';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.css']
})
export class DashboardAnalyticsComponent implements OnInit, OnDestroy {

  // ? Atributos Charts
  dataChartArea: any = {
    date: '',
    total: 0,
  };
  dataChartPie: any;
  cantUsuariosTotales: number = 0;
  cantFacturasTotal: number = 0;
  cantProductosTotal: number = 0;
  today = new Date();

  dataChart: any = [
    { name: 'Procesadores', data: [0, 120, 80, 160, 180, 200, 220, 240, 260, 280, 300, 320] },
    { name: 'RAM', data: [80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190] },
    { name: 'Motherboards', data: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105] },
  ];

  
  // * CONSTRUCTOR
  constructor(
    private LoginService: LoginService,
    private ChartService: ChartService
  ) {
    // this.LoginService.checkTokenExpiration();
  }

  ngOnInit(): void {

    setTimeout(() => {      
      this.createChartArea();
    }, 200);

    setTimeout(() => {    
      this.generatePieChart();
    }, 300);

    setTimeout(() => {
      this.createChartDonut();
    }, 400);

    setTimeout(() => {
      this.createChartRadar();
    }, 500);

    setTimeout(() => {
      this.createChartLine();
    }, 600);    
  }

  ngOnDestroy(): void {

  }

  constructorChart(chartName: any, options: any) {
    const chart = new ApexCharts(document.querySelector(`#` + chartName), options);
    chart.render();
  }

  /**
   * Chart Type Area | Facturacion por mes anual
   */
  createChartArea() {
    this.ChartService.listTotalIngresosXMes().subscribe(
      res => {
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
          series: res.map(
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
          ...res
            .filter((item: any) => item.name === añoActual.toString())
            .map((item: any) => Math.max(...item.data))
        );

        this.dataChartArea = {
          date: añoActual,
          total: maxTotalAño
        }
        this.constructorChart('chartArea', optionsChartArea);
      }
    );
  }

  /**
   * Chart Type Pie | Top 5 Productos mas Vendidos
   */
  generatePieChart(): void {

    this.ChartService.listTop5ProductosMasVendidos().subscribe(
      res => {
        this.dataChartPie = res;
        const resLabels = res.map((item: any) => item.categoria);
        const resSeries = res.map((item: any) => item.cantidad_vendida);

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

        const chart = new ApexCharts(document.querySelector('#pieChart'), options);
        chart.render();

      }
    )
  }

  /**
   *  Chart Type Donut | Cantidad de Usuarios por Role
   */
  createChartDonut() {
    this.ChartService.listCantUserXRole().subscribe(
      res => {
        const options = {
          chart: {
            type: 'donut',
            background: '#f5f5f5'
          },
          labels: res.map((item: any) => item.name),
          series: res.map((item: any) => {
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

        this.constructorChart('chartDonut', options);
      }
    )
  }

  /**
   * Chart Type Line | Productos mas Vendidos por Mes
   */
  createChartLine() {

    this.ChartService.listCantidadDeFacturasMes().subscribe(
      res => {
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
          series: res.map(
            (item: any) => {
              item.data.map((cant: any) => { this.cantFacturasTotal += cant });
              return { name: item.name, data: item.data };
            }),
          colors: ['#f00d33', '#6875F5'],
        };

        this.constructorChart('chartLine', optionsChartLine);

      }
    )
  }

  createChartRadar() {
    this.ChartService.listAltaProductosXMes().subscribe(
      res => {
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
          series: res.map(
            (item: any) => {
              item.data.map((cant: any) => { this.cantProductosTotal += cant });
              return { name: item.name, data: item.data };
            }),
          colors: ['#6875F5', '#f00d33']
        };

        this.constructorChart('chartRadar', options);
      }
    )
  }
}
