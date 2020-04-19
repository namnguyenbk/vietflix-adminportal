import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    let login_url = environment.base_url_api + "/login"

    let body = {
      email: email,
      password: password
    }

    return this.http.post(login_url, body);
  }

  reset_password(email: string){
    let url = environment.base_url_api + "/reset_password"
    return this.http.post(url, {email})
  }

  check_reset_password(email:string, token: string){
    let url = environment.base_url_api + "/check_reset_password"
    return this.http.post(url, {email:email, token: token})
  }

  change_pass(email: string, pass: string){
    let url = environment.base_url_api + "/change-pass"
    return this.http.put(url, {email:email, password: pass})
  }
}
