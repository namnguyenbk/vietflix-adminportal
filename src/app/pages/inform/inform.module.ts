import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformRoutingModule } from './inform-routing.module';
import { ListInformComponent } from './list-inform/list-inform.component';
import { DetailedInformComponent } from './detailed-inform/detailed-inform.component';
import { AddInformComponent } from './add-inform/add-inform.component';


@NgModule({
  declarations: [ListInformComponent, DetailedInformComponent, AddInformComponent],
  imports: [
    CommonModule,
    InformRoutingModule
  ]
})
export class InformModule { }
