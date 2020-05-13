import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFilmComponent } from './list-film/list-film.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { DetailedFilmComponent } from './detailed-film/detailed-film.component';
import { EditFilmComponent } from './edit-film/edit-film.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: ListFilmComponent},
  {path: 'add-film', pathMatch: 'full', component: AddFilmComponent},
  {path: ':film_id', pathMatch: 'full', component: DetailedFilmComponent},
  {path: ':film_id/episodes/:episode_id', pathMatch: 'full', component: DetailedFilmComponent},
  {path: ':film_id/edit', pathMatch: 'full', component: EditFilmComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmRoutingModule { }
