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
      let access_token = localStorage.getItem('access_token');
      if(access_token){
        is_valid_token = true;
      }
      // await this.user_services.get_me().toPromise().then(
      //   (res : User) =>{
      //     if( res.role == 'user'){
      //       is_valid_token = false;
      //     }else{
      //       is_valid_token = true;
      //       localStorage.removeItem('username')
      //       localStorage.removeItem('email')
      //       localStorage.setItem('username', res.name)
      //       localStorage.setItem('email', res.email)
      //     }

      //   },
      //   error =>{
      //     this.router.navigate(['login'])
      //   }
      // )
      this.user_services.get_me().subscribe((res:User) =>{
        if( res.role == 'user'){
            is_valid_token = false;
          }else{
            is_valid_token = true;
            localStorage.removeItem('username')
            localStorage.removeItem('email')
            localStorage.setItem('username', res.name)
            localStorage.setItem('email', res.email)
          }
      }, error =>{
        this.router.navigate(['login']);
      });

    return is_valid_token;

  }
}
