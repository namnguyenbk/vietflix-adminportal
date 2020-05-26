import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  is_home_selected = false;
  is_film_selected = false;
  is_category_selected = false;
  is_user_selected = false;
  is_inform_selected = false;

  is_show_change_info =false;
  is_show_change_password =false;

  isLoadingInfo = false;
  isLoadingToken = false;
  isLoadingPass = false;

  username : string;
  me : any;

  change_info_form: FormGroup;
  is_change_email;

  tokenForm: FormGroup;
  show_token_error :boolean;
  isTokenPass : boolean;
  waiting_token = false;
  new_email: string;

  change_passwors_form: FormGroup;

  current_component = ''

  constructor(public router: Router, private fb: FormBuilder, private auth_service: AuthService,
    private notification: NzNotificationService, private user_services: UserService) {
  }
  ngOnInit() {
    this.username = localStorage.getItem('username')
    this.change_info_form = this.fb.group({
      email: [localStorage.getItem('email'), [Validators.email, Validators.required]],
      name: [localStorage.getItem('username'), [Validators.required]],
      password: [null, [Validators.required]],
    });
  //   this.router.events.subscribe((event: Event) => {
  //     if (event instanceof NavigationEnd) {
  //       if(event.url.startsWith('/home')){
  //         this.is_home_selected = true;
  //         return;
  //       }
  //       if(event.url.startsWith('/film')){
  //         this.is_film_selected = true;
  //         return;
  //       }
  //       if(event.url.startsWith('/category')){
  //         this.is_category_selected = true;
  //         return;
  //       }
  //       if(event.url.startsWith('/user')){
  //         this.is_user_selected = true;
  //         return;
  //       }
  //       if(event.url.startsWith('/inform')){
  //         this.is_inform_selected = true;
  //         return;
  //       }
  //     }
  // });

  this.user_services.get_me().subscribe(res=>{
    this.me =res
  });

  this.tokenForm = this.fb.group({
    token: [null, [Validators.required]],
  });

  this.change_passwors_form = this.fb.group({
    old_password: [null, [Validators.required]],
    new_password: [null, [Validators.required]],
    renew_password: [null, [Validators.required]],
  });


  }

  logout(){
    this.is_home_selected = true;
    this.me = null;
    localStorage.removeItem('access_token')
    localStorage.removeItem('username')
    localStorage.removeItem('access_token')
    localStorage.removeItem('access_token')
    location.reload()
    // this.router.navigate(['login']);

  }

  open_change_info(){
    if(this.waiting_token){
      this.isTokenPass = true;
      return;
    }
    this.is_show_change_info = true;
  }

  open_change_password(){
    this.is_show_change_password = true;
  }

  infoCancel(){
    this.is_show_change_info = false;
  }

  infoOk(){
    for (const i in this.change_info_form.controls) {
      this.change_info_form.controls[i].markAsDirty();
      this.change_info_form.controls[i].updateValueAndValidity();
    }
    if(this.change_info_form.invalid){
      // this.change_info_form.setErrors({'incorrect': true})
      return;
    }
    var email = this.change_info_form.controls['email'].value;
    var name = this.change_info_form.controls['name'].value;
    var password = this.change_info_form.controls['password'].value;
    this.isLoadingInfo = true;
    this.user_services.update(this.me.id, {'email': email, 'name': name, 'password': password}).subscribe(res=>{
      this.change_info_form.controls['password'].reset();
      localStorage.setItem('email', email)
      localStorage.setItem('username', name)
      this.is_show_change_info = false;
      if(email != this.me.email){
        this.is_change_email = true;
        this.isTokenPass = true;
        this.waiting_token = true;
        this.user_services.get_me().subscribe(res=>{
          this.me =res;
          this.new_email = email;
          this.isLoadingInfo = false;
        });
      }else{
        this.user_services.get_me().subscribe(res=>{
          this.me =res;
          this.isLoadingInfo = false;
        });
        this.notification.create('success', 'Thành công', 'Đã cập nhật thông tin');
      }
    }, error=>{
      this.change_info_form.controls['password'].reset();
      this.isLoadingInfo = false;
      this.notification.create('error', 'Thất bại', `${error.error.error_message}`);
    })
  }

  handleCancelToken(){
    this.isTokenPass = false;
  }

  handleOkToken(){
    for (const i in this.tokenForm.controls) {
      this.tokenForm.controls[i].markAsDirty();
      this.tokenForm.controls[i].updateValueAndValidity();
    }

    var token = this.tokenForm.controls['token'].value;

    if(this.tokenForm.controls['token'].invalid){
      return 0;
    }

    this.isLoadingToken = true;
    this.auth_service.check_verification_code(this.me.email, token, this.new_email).subscribe(
      (res : any) =>{
        this.isLoadingToken = false;
        this.show_token_error = false;
        this.isTokenPass = false;
        this.waiting_token = false;
        this.tokenForm.reset()
        this.notification.create('success', 'Thành công', 'Đã cập nhật thông tin')        
    },

      (error) => {
        this.isLoadingToken = false;
        this.show_token_error = true;
    }
    );
  }

  passCancel(){
    this.change_passwors_form.reset();
    this.is_show_change_password = false;
  }

  passOk(){
    for (const i in this.change_passwors_form.controls) {
      this.change_passwors_form.controls[i].markAsDirty();
      this.change_passwors_form.controls[i].updateValueAndValidity();
    }

    var old_password = this.change_passwors_form.controls['old_password'].value; 
    var new_password = this.change_passwors_form.controls['new_password'].value; 
    var renew_password = this.change_passwors_form.controls['renew_password'].value;

    if(new_password != renew_password){
      this.change_passwors_form.controls['renew_password'].setErrors({'incorrect': true})
      return 0;
    }

    this.isLoadingPass = true;
    this.auth_service.change_pass(this.me.email, new_password, old_password).subscribe(res=>{
      this.isLoadingPass = false;
      this.notification.create('success', 'Thành công', 'Đã cập nhật thông tin');
      this.is_show_change_password = false;
      this.change_passwors_form.reset();
    }, error=>{
      this.isLoadingPass = false;
      this.notification.create('error', 'Thất bại', `${error.error.error_message}`);
    })
  }

  onActivate(event){
    this.current_component = event.constructor.name
    if(event.constructor.name != "LoginComponent"){
      this.user_services.get_me().subscribe(res=>{
        this.me =res;
        this.change_info_form = this.fb.group({
          email: [this.me.email, [Validators.email, Validators.required]],
          name: [this.me.name, [Validators.required]],
          password: [null, [Validators.required]],
        });
      })
    }
  }

  
}
