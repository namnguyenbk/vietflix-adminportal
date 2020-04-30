import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { CategoryService } from 'src/app/services/category.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {
  list_of_category = [];


  type = 1;


  add_film_form_1 : FormGroup;
  add_film_form_21 : FormGroup;
  add_film_form_22 : FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  current = 0;

  film_id: number;
  film: any;
  film_preview:any;

  isLoadingFilm = false;

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    if (this.current === 0 && this.add_film_form_1.invalid){
      for (const i in this.add_film_form_1.controls) {
        this.add_film_form_1.controls[i].markAsDirty();
        this.add_film_form_1.controls[i].updateValueAndValidity();
      }
      return;
    }

    if (this.current === 1 && this.type == 1 &&this.add_film_form_21.invalid){
      for (const i in this.add_film_form_21.controls) {
        this.add_film_form_21.controls[i].markAsDirty();
        this.add_film_form_21.controls[i].updateValueAndValidity();
      }
      return;
    }
    if (this.current === 1 && this.type == 2 && this.add_film_form_22.invalid){
      for (const i in this.add_film_form_22.controls) {
        this.add_film_form_22.controls[i].markAsDirty();
        this.add_film_form_22.controls[i].updateValueAndValidity();
      }
      return;
    }

    this.type = this.add_film_form_1.controls["type"].value

    this.current += 1;
  }

  done(): void {
    var video_url : string;
    var poster_url : string;
    var trailer_url : string;
    var release_date= this.add_film_form_1.controls['date'].value
    let meta_data = {
      subname: this.add_film_form_1.controls['subname'].value,
      director: this.add_film_form_1.controls['director'].value,
      actor: this.add_film_form_1.controls['actor'].value,
      brand: this.add_film_form_1.controls['brand'].value,
      description: this.add_film_form_1.controls['description'].value,
      release_date: this.add_film_form_1.controls['date'].value
    }

    let episodes = []
    if(this.type == 2){
      for (const i in this.add_film_form_22.controls) {
        if(i.startsWith('passenger')){
          episodes.push({
            id: parseInt(i.split('_')[1]),
            video_url: this.add_film_form_22.controls[i].value
          })
        }
      }
      poster_url = this.add_film_form_22.controls['poster_url_2'].value;
      trailer_url = this.add_film_form_22.controls['trailer_url_2'].value;
    }else{
      video_url = this.add_film_form_21.controls['video_url'].value;
      poster_url = this.add_film_form_21.controls['poster_url'].value;
      trailer_url = this.add_film_form_21.controls['trailer_url'].value;
    }

    meta_data['image_url'] = poster_url;
    meta_data['trailer_url'] = trailer_url;

    this.film_preview = {
      name: this.add_film_form_1.controls['name'].value,
      type: this.type,
      image_url: poster_url,
      video_url: video_url,
      episodes: episodes,
      meta_data: meta_data,
      category: this.add_film_form_1.controls['category'].value
    }

    let film = {
      name: this.add_film_form_1.controls['name'].value,
      type: this.type,
      image_url: poster_url,
      video_url: video_url,
      episodes: JSON.stringify(episodes),
      meta_data: JSON.stringify(meta_data),
      category: this.add_film_form_1.controls['category'].value
    }

    this.isLoadingFilm = true;
    this.film_service.update_film(this.film_id, film).subscribe((res:any)=>{
      this.isLoadingFilm = false;
      this.notification.create('success', 'Thành công', 'Cập nhật thành công!');
      this.router.navigate([`/film/${res.id}`])
    })

  }

  constructor(private route: ActivatedRoute, private film_service: FilmService, private fb: FormBuilder, private category_service: CategoryService,
    public router: Router, private notification: NzNotificationService) { }

  ngOnInit() {
    this.add_film_form_1 = this.fb.group({
      name: [null, Validators.required],
      subname: [null],
      director: [null],
      category: [null, Validators.required],
      date: [null],
      actor: [null],
      brand: [null],
      type: ["1"],
      description: [null, Validators.required],
    });

    this.add_film_form_21 = this.fb.group({
      length: [null],
      video_url: [null, Validators.required],
      trailer_url: [null, Validators.required],
      poster_url: [null, Validators.required]
    });

    this.add_film_form_22 = this.fb.group({
      trailer_url_2 : [null, Validators.required],
      poster_url_2 : [null, Validators.required],
    });

    this.category_service.get_category().subscribe((res:any)=>{
      this.list_of_category = res
    })

    this.film_id = parseInt(this.route.snapshot.paramMap.get("film_id"));
    this.film_service.get_film(this.film_id).subscribe((res:any)=>{
      this.film = res
      this.film.meta_data = JSON.parse(res.meta_data);
      this.film.episodes = JSON.parse(res.episodes);

      let category_ids = [];
      this.film.categories.forEach(element => {
        category_ids.push(element.id)
      });

      this.add_film_form_1 = this.fb.group({
        name: [this.film.name, Validators.required],
        subname: [this.film.meta_data.subname],
        director: [this.film.meta_data.director],
        category: [category_ids, Validators.required],
        date: [this.film.meta_data.release_date],
        actor: [this.film.meta_data.actor],
        brand: [this.film.meta_data.brand],
        type: [this.film.type],
        description: [this.film.meta_data.description, Validators.required],
      });

      if(this.film.type == 1){
        this.add_film_form_21 = this.fb.group({
          length: [null],
          video_url: [this.film.video_url, Validators.required],
          trailer_url: [this.film.meta_data.trailer_url, Validators.required],
          poster_url: [this.film.image_url, Validators.required]
        });
      }else{
        this.add_film_form_22 = this.fb.group({
          trailer_url_2 : [this.film.meta_data.trailer_url, Validators.required],
          poster_url_2 : [this.film.image_url, Validators.required],
        });
        this.film.episodes.forEach(element => {
          const control = {
            id: element.id,
            controlInstance: `passenger_${element.id}`
          };
          const index = this.listOfControl.push(control);
          console.log(this.listOfControl[this.listOfControl.length - 1]);
          this.add_film_form_22.addControl(
            this.listOfControl[index - 1].controlInstance,
            new FormControl(element.video_url, Validators.required)
          );
        });
      }
  
      this.category_service.get_category().subscribe((res:any)=>{
        this.list_of_category = res
      })

    });
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger_${id}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.add_film_form_22.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.add_film_form_22.removeControl(i.controlInstance);
    }
  }

}
