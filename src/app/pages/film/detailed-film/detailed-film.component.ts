import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilmService } from 'src/app/services/film.service';
import { CommentService } from 'src/app/services/comment.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { UserService } from 'src/app/services/user.service';
import {DomSanitizer} from '@angular/platform-browser';
const count = 5;
import * as Plyr from 'plyr';
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

  current_episode ='1';
  current_video_url:any;

  list_comments = [];
  slice_comments = [];

  me: any;
  
  constructor(private route: ActivatedRoute, private film_service: FilmService, private comment_service: CommentService,
    private modalService: NzModalService, private user_service: UserService, private router: Router, 
    private notification_service: NzNotificationService,
    public sanitizer : DomSanitizer) { }

  public player;
  ngOnInit() {
    window.scroll(0,0);
    this.player = new Plyr('#plyrID', { 
      captions: { active: true }
    });
    this.film_id = parseInt(this.route.snapshot.paramMap.get("film_id"));
    this.film_service.get_film(this.film_id).subscribe((res:any)=>{
      this.film = res
      this.film.meta_data = JSON.parse(res.meta_data);
      this.film.episodes = JSON.parse(res.episodes);

      this.film.meta_data.trailer_url = "https://www.youtube.com/embed/" + this.film.meta_data.trailer_url

      if(!this.current_video_url){
        if(this.film.video_url){
          this.current_video_url = this.film.video_url;
        }else{
          this
          .current_video_url = this.film.episodes[0]['video_url'];
        }
      }

      if(this.film.type == 1){
        if(this.current_video_url != this.film.video_url){
          localStorage.setItem('video_url', this.film.video_url)
          this.router.navigateByUrl(`/film/${this.film.id}/episodes/0`, { skipLocationChange: true }).then(() => {
            this.router.navigate([`/film/${this.film.id}`]);
          }); 
        }
      }else{
        
      }

      this.user_service.get_me().subscribe((res:any)=>{
        this.me = res;
        this.comment_service.get_comments(this.film.id).subscribe((res: any) => {
          this.list_comments = res;
          this.slice_comments = this.list_comments.slice(0, 10)
          this.initLoading = false;
        });
      });

    });


  }

  getData(callback: (res: any) => void): void {
    this.comment_service.get_comments(this.film_id).subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
    this.slice_comments = this.list_comments.slice(0, this.slice_comments.length+10)
  }

  delete_comment(id: number, text: string){
    this.modalService.confirm({
      nzTitle: '<i>Bạn có muốn xoá bình luận này?</i>',
      nzContent: `<b>${text}</b>`,
      nzCancelText: 'Huỷ',
      nzOkText: 'Lưu',
      nzOnOk: () => {
        this.list_comments = this.list_comments.filter(function(value, index, arr){ return value.id != id;});
        this.slice_comments = this.list_comments.filter(function(value, index, arr){ return value.id != id;});
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
        this.initLoading = true;
        this.user_service.update_status(id,'blocked').subscribe(res=>{
          this.comment_service.get_comments(this.film.id).subscribe((res: any) => {
            this.list_comments = res;
            this.slice_comments = this.list_comments.slice(0, 10)
            this.initLoading = false;
          });
        });
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
        }, error => {
          this.notification_service.create('error', 'Thất bại', 'Không thể xoá phim này!')
        });
      }
    });
  }

  change_episode(url: string){
    localStorage.setItem('video_url', url);
    this.current_video_url = url;
    window.scroll(0,0);
  }

  get_trailer_url(){
    return this.sanitizer.bypassSecurityTrustUrl(this.film.meta_data.trailer_url)
  }

}
