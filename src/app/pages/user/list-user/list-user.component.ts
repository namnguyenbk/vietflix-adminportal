import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';


@Component({
  selector: 'nz-demo-table-expand',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  list_of_user = [];
  
  mapOfExpandData: { [key: string]: boolean } = {};

  role_form: FormGroup;
  show_role_modal : boolean;
  show_role_error : boolean;
  user_id :number;
  user_email : string;

  search_form : FormGroup;

  current_admin_role : string;

  isLoadingUser = false;
  isLoadingRole = false;
  isLoadingStatus = false;

  constructor(public user_service: UserService, private fb: FormBuilder, private notification: NzNotificationService,
    private modalService: NzModalService) {
  }

  roleOk(){
    for (const i in this.role_form.controls) {
      this.role_form.controls[i].markAsDirty();
      this.role_form.controls[i].updateValueAndValidity();
    }
    var role = this.role_form.controls['role_select'].value;

    this.isLoadingRole = true;
    this.user_service.update_role(this.user_id, role).subscribe(
      (res:any)=>{
        this.notification.create(
          'success',
          'Thành công',
          `Cập nhật quyền thành công`
        );
        this.user_email = '';
        this.user_id = -1;
        this.isLoadingRole = false;
        this.show_role_error = false;
        this.show_role_modal = false;

        this.search();
    },
    (error) =>{
      this.isLoadingRole = false;
      this.show_role_error = true;
    });

  }

  roleCancel(){
    this.show_role_modal = false;
    this.user_email = '';
    this.user_id = -1;
  }

  open_role_modal(user_id: number, email: string){
    this.show_role_modal = true;
    this.user_id = user_id;
    this.user_email = email;
  }

  show_status(user_id:number, status: string): void {
    this.modalService.confirm({
      nzTitle: '<i>Bạn có muốn thực hiện hành động này?</i>',
      nzContent: `<b>Thay đổi trạng thái tài khoản trở thành: ${status} </b>`,
      nzCancelText: 'Huỷ',
      nzOkText: 'Lưu',
      nzOnOk: () =>{
        this.isLoadingUser = true;
        this.user_service.update_status(user_id, status).subscribe((res:any)=>{
          this.notification.create('success', 'Thành công',  `Thay đổi trạng thái tài khoản trở thành: ${status}`);
          this.search();
        }, error =>{
          this.notification.create('error', 'Thất bại',  `Có lỗi xảy ra vui lòng thử lại`);
        })

      }
    })
  }

  search(){
    for (const i in this.search_form.controls) {
      this.search_form.controls[i].markAsDirty();
      this.search_form.controls[i].updateValueAndValidity();
    }

    let user = {
      name : this.search_form.controls['search_name'].value,
      email : this.search_form.controls['search_email'].value,
      status : this.search_form.controls['search_status'].value,
      role : this.search_form.controls['search_role'].value,
      from_date : this.search_form.controls['from_date'].value,
      to_date : this.search_form.controls['to_date'].value
    }

    this.isLoadingUser = true;
    this.user_service.search_user(user).subscribe((res:any)=>{
      this.list_of_user = res;
      this.isLoadingUser = false;
    })
  }

  reset_form(){
    this.search_form.reset();
    this.isLoadingUser = true;
    this.user_service.get_user().subscribe( (res: any) =>{
      this.list_of_user = res;
      this.isLoadingUser = false;
    });
  }
  

  ngOnInit(): void {
    this.isLoadingUser = true;
    this.user_service.get_user().subscribe( (res: any) =>{
      this.list_of_user = res;
      this.isLoadingUser = false;
    });

    this.search_form = this.fb.group({
      search_name: [null],
      search_email: [null],
      search_status: [null],
      search_role: [null],
      from_date: [null ],
      to_date: [null ]
    });

    this.role_form = this.fb.group({
      role_select: ['admin', [Validators.required]],
    });
    this.show_role_modal = false;
    this.show_role_modal = false;
    this.user_id = -1;
    this.user_email = ""

    this.user_service.get_me().subscribe((res:any)=>{
      this.current_admin_role = res.role
      console.log(this.current_admin_role)
    })

  }

  
}
