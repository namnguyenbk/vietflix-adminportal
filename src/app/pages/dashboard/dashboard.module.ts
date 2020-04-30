import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
// import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzStatisticModule,
    // NgZorroAntdModule,
    NzSkeletonModule
  ]
})
export class DashboardModule { }
