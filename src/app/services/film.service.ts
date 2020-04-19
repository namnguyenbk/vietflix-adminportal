import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }

  get_film(id: number){
    let url = environment.base_url_api + `/film/${id}`
    let access_token = localStorage.getItem('access_token')
    let headers = {
      'Authorization': 'Bearer '+ access_token
    }

    return this.http.get(url, {headers})
  }

  add_film(name: string, type: string, image_url: string, video_url: string, episodes: any, meta_data: any){
    let url = environment.base_url_api + "/film"
    let access_token = localStorage.getItem('access_token')
    let headers = {
      'Authorization': 'Bearer '+ access_token
    }
    let body = {
      name: name,
      type: type, 
      image_url: image_url,
      video: video_url,
      episodes: JSON.stringify(episodes),
      meta_data: JSON.stringify(meta_data)
    }

    return this.http.post(url,body, {headers})
  }

  update_film(id: number, name: string, type: string, image_url: string, video_url: string, episodes: any, meta_data: any){
    let url = environment.base_url_api + `/film${id}`
    let access_token = localStorage.getItem('access_token')
    let headers = {
      'Authorization': 'Bearer '+ access_token
    }
    let body = {
      name: name,
      type: type, 
      image_url: image_url,
      video: video_url,
      episodes: JSON.stringify(episodes),
      meta_data: JSON.stringify(meta_data)
    }

    return this.http.put(url,body, {headers})
  }

  delete_film(id: number){
    let url = environment.base_url_api + `/film/${id}`
    let access_token = localStorage.getItem('access_token')
    let headers = {
      'Authorization': 'Bearer '+ access_token
    }

    return this.http.delete(url, {headers})
  }
  
}
