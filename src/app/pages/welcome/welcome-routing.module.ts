import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { FilmComponent } from './film/film.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent,
  children: [
    { path: 'film', pathMatch: 'full', component: FilmComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
