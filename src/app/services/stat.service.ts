import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }

  get(from_date, to_date){
    let url = environment.base_url_api + "/stat"
    if(from_date){
      url = `${url}?from_date=${from_date}&to_date=${to_date}`
    }
    let access_token = localStorage.getItem('access_token')
    let headers = {
      'Authorization': 'Bearer '+ access_token
    }
    return this.http.get(url, {headers})
  }
}
