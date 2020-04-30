import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryRoutingModule } from './category-routing.module';
import { ListCategoryComponent } from './list-category/list-category.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [ListCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    NzListModule,
    NzTableModule,
    NzModalModule,
    NgZorroAntdModule,
    NzFormModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
