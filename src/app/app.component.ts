import { Component, OnChanges } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  is_home_selected = false;
  is_film_selected = false;
  is_category_selected = false;
  is_user_selected = false;
  is_inform_selected = false;

  constructor(public router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if(event.url.startsWith('/home')){
          this.is_home_selected = true;
        }
        if(event.url.startsWith('/film')){
          this.is_film_selected = true;
        }
        if(event.url.startsWith('/category')){
          this.is_category_selected = true;
        }
        if(event.url.startsWith('/user')){
          this.is_user_selected = true;
        }
        if(event.url.startsWith('/inform')){
          this.is_inform_selected = true;
        }
      }
  });
  }

  logout(){
    this.is_home_selected = true;
    localStorage.removeItem('access_token')
    this.router.navigate(['login']);

  }
}
