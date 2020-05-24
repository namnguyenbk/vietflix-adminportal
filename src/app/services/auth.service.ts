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

  add_verification_code(email: string){
    let url = environment.base_url_api + "/verification_code"
    return this.http.post(url, {email})
  }

  check_verification_code(email:string, token: string, new_email:string){
    let url = environment.base_url_api + "/check_verification_code"
    return this.http.post(url, {email:email, token: token, new_email: new_email})
  }

  change_pass(email: string, pass: string, old_pass: string){
    let url = environment.base_url_api + "/change-pass"
    return this.http.put(url, {email:email, password: pass, old_password: old_pass})
  }
}
