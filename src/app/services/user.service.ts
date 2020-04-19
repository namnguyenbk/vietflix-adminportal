import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get_me(access_token: string){
    let login_url = environment.base_url_api + "/me"
    let headers = {
      'Authorization': 'Bearer '+ access_token
    }
    return this.http.get(login_url, {headers})
  }

  update_role(user_id: number, role: string){
    let url = environment.base_url_api + `/roles`
    let access_token = localStorage.getItem('access_token')
    let headers = {
      'Authorization': 'Bearer '+ access_token
    }

    return this.http.put(url,{user_id: user_id, role: role}, {headers})
  }

  update_status(user_id: number, status: string){
    let url = environment.base_url_api + `/status`
    let access_token = localStorage.getItem('access_token')
    let headers = {
      'Authorization': 'Bearer '+ access_token
    }

    return this.http.put(url,{user_id: user_id, status: status}, {headers})
  }

  get_user(){
    let url = environment.base_url_api + `/users`
    let access_token = localStorage.getItem('access_token')
    let headers = {
      'Authorization': 'Bearer '+ access_token
    }

    return this.http.get(url, {headers})
  }

  
}
