import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { FilmComponent } from './film/film.component';


@NgModule({
  imports: [WelcomeRoutingModule],
  declarations: [WelcomeComponent, FilmComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
