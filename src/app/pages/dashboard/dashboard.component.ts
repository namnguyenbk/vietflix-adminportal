import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/services/stat.service';

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

}
