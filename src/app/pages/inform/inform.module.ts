import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformRoutingModule } from './inform-routing.module';
import { ListInformComponent } from './list-inform/list-inform.component';
import { DetailedInformComponent } from './detailed-inform/detailed-inform.component';
import { AddInformComponent } from './add-inform/add-inform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [ListInformComponent, DetailedInformComponent, AddInformComponent],
  imports: [
    CommonModule,
    InformRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzListModule,
    NzTableModule,
    NzModalModule,
    NgZorroAntdModule,
    NzFormModule,
    NzSelectModule,
  ]
})
export class InformModule { }
