import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { CommentService } from 'src/app/services/comment.service';
import { NzModalService } from 'ng-zorro-antd';
import { UserService } from 'src/app/services/user.service';

const count = 5;

@Component({
  selector: 'app-detailed-film',
  templateUrl: './detailed-film.component.html',
  styleUrls: ['./detailed-film.component.css']
})
export class DetailedFilmComponent implements OnInit {
  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];

  film_id: number;
  film: any;
  comments: any;

  current_episode =0;
  current_video_url : string;

  poster = null;
  sources: Plyr.Source[] = [{
    type: 'video',
    src: null,
  }];
  
  constructor(private route: ActivatedRoute, private film_service: FilmService, private comment_service: CommentService,
    private modalService: NzModalService, private user_service: UserService, private router: Router) { }

  ngOnInit() {
    this.film_id = parseInt(this.route.snapshot.paramMap.get("film_id"));
    this.film_service.get_film(this.film_id).subscribe((res:any)=>{
      this.film = res
      this.film.meta_data = JSON.parse(res.meta_data);
      this.film.episodes = JSON.parse(res.episodes);

      this.poster = this.film.imager_url;
      if(this.film.video_url){
        this.current_video_url = this.film.video_url;
      }else{
        this.current_video_url = this.film.episodes[0]['video_url'];
      }

      this.sources[0].src = this.current_video_url;

      // this.comment_service.get_comments(this.film_id).subscribe((res:any)=>{
      //   this.comments = res;
      //   this.list = res.results;
      //   this.initLoading = false;
      // })
    });
    this.getData((res: any) => {
      this.data = res;
      this.list = res;
      this.initLoading = false;
    });
  }

  getData(callback: (res: any) => void): void {
    this.comment_service.get_comments(this.film_id).subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.list = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
    this.comment_service.get_comments(this.film_id).subscribe((res: any) => {
      this.data = this.data.concat(res);
      this.list = [...this.data];
      this.loadingMore = false;
    });
  }

  delete_comment(id: number, text: string){
    this.modalService.confirm({
      nzTitle: '<i>Bạn có muốn xoá bình luận này?</i>',
      nzContent: `<b>${text}</b>`,
      nzCancelText: 'Huỷ',
      nzOkText: 'Lưu',
      nzOnOk: () => {
        this.comment_service.delete_comments(id).subscribe(res=>{
          this.getData((res: any) => {
            this.data = res;
            this.list = res;
            this.initLoading = false;
          });
        })
      }
    });
  }

  block_user(id: number, username: string){
    this.modalService.confirm({
      nzTitle: '<i>Bạn có muốn khoá tài khoản này?</i>',
      nzContent: `<b>${username}</b>`,
      nzCancelText: 'Huỷ',
      nzOkText: 'Lưu',
      nzOnOk: () => {
        this.user_service.update_status(id,'blocked').subscribe(res=>{})
      }
    });
  }

  edit_film(id:number){
    this.router.navigate([`film/${id}/edit`])
  }

  delete_film(id: number, name:string){
    this.modalService.confirm({
      nzTitle: '<i>Bạn có muốn xoá phim này?</i>',
      nzContent: `<b>${name}</b>`,
      nzCancelText: 'Huỷ',
      nzOkText: 'Lưu',
      nzOnOk: () => {
        this.film_service.delete_film(id).subscribe(res=>{
          this.router.navigate(['film']);
        })
      }
    });
  }

  change_episode(id: number){
    console.log(id)
    // this.current_episode = id
  }

}
