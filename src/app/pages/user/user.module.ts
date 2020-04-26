import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
  declarations: [ListUserComponent, DetailUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgZorroAntdModule,
    NzListModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule
  ],
//   schemas: [
//     CUSTOM_ELEMENTS_SCHEMA
// ],
})
export class UserModule { }
