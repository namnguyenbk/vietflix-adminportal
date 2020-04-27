import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmRoutingModule } from './film-routing.module';
import { ListFilmComponent } from './list-film/list-film.component';
import { DetailedFilmComponent } from './detailed-film/detailed-film.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { EditFilmComponent } from './edit-film/edit-film.component';

@NgModule({
  declarations: [ListFilmComponent, DetailedFilmComponent, AddFilmComponent, EditFilmComponent],
  imports: [
    CommonModule,
    FilmRoutingModule,
    NgZorroAntdModule,
    NzListModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzStepsModule,
    NzUploadModule,
    NzGridModule
  ]
})
export class FilmModule { }
