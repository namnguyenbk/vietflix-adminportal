import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgZorroAntdModule} from 'ng-zorro-antd';
@NgModule({
  declarations: [ListUserComponent, DetailUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgZorroAntdModule,
    NzListModule,
    NzTableModule
  ],
//   schemas: [
//     CUSTOM_ELEMENTS_SCHEMA
// ],
})
export class UserModule { }
