import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-film',
  templateUrl: './list-film.component.html',
  styleUrls: ['./list-film.component.css']
})
export class ListFilmComponent implements OnInit {
  list_of_film = [];
  search_form : FormGroup;

  search_categories = [];

  show_add_film = false;

  constructor(private film_service: FilmService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.search_form = this.fb.group({
      search_name: [null],
      search_category: [null],
      from_date: [null],
      to_date: [null],
    });

    
    let film = {
      'name': '',
      'categories': [],
      'from_date': '1970-01-01',
      'to_date': '2050-01-01'
    }

    this.film_service.search_film(film).subscribe((res:any)=>{
      this.list_of_film = res
    })

  }

  search(){
    for (const i in this.search_form.controls) {
      this.search_form.controls[i].markAsDirty();
      this.search_form.controls[i].updateValueAndValidity();
    }

    let film = {
      name : this.search_form.controls['search_name'].value,
      categories : this.search_categories,
      from_date : this.search_form.controls['from_date'].value,
      to_date : this.search_form.controls['to_date'].value
    }

    this.film_service.search_film(film).subscribe((res:any)=>{
      this.list_of_film = res
    })
  }

  reset_form(){
    this.search_form.reset;
    this.film_service.search_film({}).subscribe((res:any)=>{
      this.list_of_film = res
    })
  }

  add_film(){
    this.router.navigate(['film/add-film'])
  }

}
