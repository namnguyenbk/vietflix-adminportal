import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './auth-guard.service'
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'  },
  { path: 'login', pathMatch: 'full', component: LoginComponent},
  { path: 'home', canActivate: [AuthGuardService], loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'film', canActivate: [AuthGuardService], loadChildren: () => import('./pages/film/film.module').then(m => m.FilmModule)},
  { path: 'category', canActivate: [AuthGuardService], loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)},
  { path: 'inform', canActivate: [AuthGuardService], loadChildren: () => import('./pages/inform/inform.module').then(m => m.InformModule)},
  { path: 'user', canActivate: [AuthGuardService], loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
