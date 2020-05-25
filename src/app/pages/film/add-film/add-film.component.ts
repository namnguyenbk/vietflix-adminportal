import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FilmService } from 'src/app/services/film.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {

  list_of_category = [];


  type = 1;


  add_film_form_1 : FormGroup;
  add_film_form_21 : FormGroup;
  add_film_form_22 : FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  current = 0;

  isAdding = false;
  film: any;

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
    let meta_data = {
      subname: this.add_film_form_1.controls['subname'].value,
      director: this.add_film_form_1.controls['director'].value,
      actor: this.add_film_form_1.controls['actor'].value,
      brand: this.add_film_form_1.controls['brand'].value,
      description: this.add_film_form_1.controls['description'].value,
      release_date: this.add_film_form_1.controls['date'].value
      // release_date:  release_date?`${release_date.getFullYear()}-${release_date.getMonth()}-${release_date.getDate()}`:''
    }

    let episodes = []
    if(this.type == 2){
      for (const i in this.add_film_form_22.controls) {
        if(i.startsWith('passenger')){
          episodes.push({
            id: parseInt(i.split('_')[1]) + 1,
            video_url: this.add_film_form_22.controls[i].value
          })
        }
      }
      video_url = episodes[0].video_url
      poster_url = this.add_film_form_22.controls['poster_url_2'].value;
      trailer_url = this.add_film_form_22.controls['trailer_url_2'].value;
    }else{
      video_url = this.add_film_form_21.controls['video_url'].value;
      poster_url = this.add_film_form_21.controls['poster_url'].value;
      trailer_url = this.add_film_form_21.controls['trailer_url'].value;
    }

    meta_data['trailer_url'] = trailer_url

    this.film = {
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

    this.isAdding = true;
    this.film_service.add_film(film).subscribe((res:any)=>{
      this.isAdding = false;
      this.notification.create('success', 'Thành công', 'Tạo phim mới thành công!');
      this.router.navigate([`/film/${res.id}`])
    }, error=>{
      this.isAdding = false;
      this.notification.create('error', 'Thất bại', error.error.error_message);
    })

  }

  constructor(private film_service: FilmService, private fb: FormBuilder, private category_service: CategoryService,
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
    this.addField();

    this.category_service.get_category().subscribe((res:any)=>{
      this.list_of_category = res
    })
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
