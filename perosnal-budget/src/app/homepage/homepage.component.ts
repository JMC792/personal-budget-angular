import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  //-----------------
  //Color Configs
  //----------------
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  };

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      console.log(res);
      for (var i = 0; i < res.data.length; i++) {
        this.dataSource.datasets[0].data[i] = res.data[i].budget;
        this.dataSource.labels[i] = res.data[i].name;
        this.dataSource.datasets[0].backgroundColor[i] = res.data[i].color;
      }
      this.createPieChart();
      this.createLineChart();
      this.createRadarChart();
    });
  }

  //-------------------
  // creates pie chart
  //-----------------
  createPieChart() {
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }

  //-------------------
  // creates line chart
  //-----------------
  createLineChart() {
    var ctx = document.getElementById('myChart2');
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: this.dataSource,
    });
  }

  //-------------------
  // creates radar chart
  //-----------------
  createRadarChart() {
    var ctx = document.getElementById('myChart3');
    var myRadarChart = new Chart(ctx, {
      type: 'radar',
      data: this.dataSource,
    });
  }
}
