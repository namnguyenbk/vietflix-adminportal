import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListInformComponent } from './list-inform/list-inform.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: ListInformComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformRoutingModule { }
