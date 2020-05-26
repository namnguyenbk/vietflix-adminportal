import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/services/stat.service';
import { ChartOptions } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stat:any;
  is_loading =true;
  constructor(private stat_service: StatService, private router: Router) {
   }

  ngOnInit() {
    this.stat_service.get(null, null).subscribe(res=>{
      this.stat = res;
      this.is_loading = false
    }, error =>{
      this.router.navigate(['login']);
    })
  }

  public lineChartData= [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartOptions = {
    responsive: true,

    title: {
      display: true,
      text: 'Biểu đồ số lượng người dùng đăng kí'
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

  place_holder_range = ['Chọn khoảng','thời gian']

  change_range(event:any){
    if(event.length == 2){
      // this.stat = null;
      this.is_loading = true;
      let from_date = `${event[0].getFullYear()}-${event[0].getMonth() + 1}-${event[0].getDate()}`;
      let to_date = `${event[1].getFullYear()}-${event[1].getMonth()+1}-${event[1].getDate()}`;
      console.log(from_date, to_date);
      this.place_holder_range = [from_date, to_date];
      this.stat_service.get(from_date, to_date).subscribe(res=>{
        this.stat = res;
        this.is_loading = false;
      })
    }
  }

}
