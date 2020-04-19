import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmRoutingModule } from './film-routing.module';
import { ListFilmComponent } from './list-film/list-film.component';
import { DetailedFilmComponent } from './detailed-film/detailed-film.component';
import { AddFilmComponent } from './add-film/add-film.component';


@NgModule({
  declarations: [ListFilmComponent, DetailedFilmComponent, AddFilmComponent],
  imports: [
    CommonModule,
    FilmRoutingModule,
  ]
})
export class FilmModule { }
