import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/services/stat.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stat:any;
  constructor(private stat_service: StatService) { }

  ngOnInit() {
    this.stat_service.get().subscribe(res=>{
      this.stat = res;
    })
  }

  public lineChartData= [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartOptions = {
    responsive: true,

    title: {
      display: true,
      text: 'Số lượng người dùng đăng ký trong 30 ngày'
  }
  };
  public lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];


}
