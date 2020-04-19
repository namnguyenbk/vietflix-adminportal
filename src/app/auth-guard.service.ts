import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public router: Router, private user_services: UserService, public jwtHelper: JwtHelperService) {
  }
    async canActivate() {
      let is_valid_token = false;
      let access_token = localStorage.getItem('access_token')
      // return !this.jwtHelper.isTokenExpired(access_token);
      await this.user_services.get_me(access_token).toPromise().then(
        (res : User) =>{
          is_valid_token = true;
        },
        error =>{
          this.router.navigate(['login'])
        }
      )

      return is_valid_token;

  }
}
