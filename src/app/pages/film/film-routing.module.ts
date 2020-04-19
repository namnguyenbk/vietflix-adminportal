import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFilmComponent } from './list-film/list-film.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: ListFilmComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmRoutingModule { }
