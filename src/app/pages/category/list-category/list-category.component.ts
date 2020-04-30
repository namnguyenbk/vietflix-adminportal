import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  search_form : FormGroup;
  categories = [];

  is_show_edit_modal = false;
  current_edit_id :number;
  current_edit_name: string;

  is_show_add_modal = false;
  new_category_name : string;

  isLoading = false;

  constructor(public category_service: CategoryService, private fb: FormBuilder, private notification: NzNotificationService,
    private modalService: NzModalService, private router: Router) { }

  ngOnInit() {
    this.search_form = this.fb.group({
      search_name: [null]
    });

    this.isLoading = true;
    this.category_service.get_category().subscribe((res:any)=>{
      this.isLoading = false;
      this.categories = res;
    });
  }

  delete_category(id: number, name:string){
    this.modalService.confirm({
      nzTitle: '<i>Bạn có muốn xoá thể loại này?</i>',
      nzContent: `<b>${name}</b>`,
      nzCancelText: 'Huỷ',
      nzOkText: 'Lưu',
      nzOnOk: () => {
        this.isLoading = true;
        this.category_service.delete_category(id).subscribe(res=>{
          this.notification.create(
            'success', 'Thành công', `Đã xoá '${name}'`
          );
          this.category_service.get_category().subscribe((res:any)=>{
            this.categories = res;
            this.isLoading = false
          }) 
        }, error=>{
          this.isLoading = false;
          this.notification.create(
            'error', 'Thất bại', `${error.error.error_message}`
          );
          
        })
      }
    });
  }

  open_edit_modal(id:number, name:string){
    this.current_edit_id = id;
    this.current_edit_name = name;
    this.is_show_edit_modal = true;
  }

  handleCancel(){
    this.is_show_edit_modal = false;
  }

  handleOk(){
    if(this.current_edit_name == null || this.current_edit_name.trim() == ''){
      return;
    }
    this.is_show_edit_modal = false;
      this.current_edit_id = null;
      this.current_edit_name = null;
      this.isLoading = true;
    this.category_service.update_category(this.current_edit_id, this.current_edit_name).subscribe(res=>{
      this.notification.create(
        'success', 'Thành công', `Cập nhật thành công!`
      );
      this.category_service.get_category().subscribe((res:any)=>{
        this.categories = res;
        this.isLoading = false;
      }) ;
    }, error=>{
      this.isLoading = false;
      this.notification.create(
        'error', 'Thất bại', `${error.error.error_message}`
      );
    })
  }

  open_add_modal(){
    this.is_show_add_modal = true;
  }

  addCancel(){
    this.is_show_add_modal = false;
    this.new_category_name = null;
  }

  addOk(){
    if(this.new_category_name == null || this.new_category_name.trim() == ''){
      return;
    }
    this.is_show_add_modal = false;
    this.new_category_name = null;
    this.isLoading = true;
    this.category_service.add_category(this.new_category_name).subscribe(res=>{
      this.notification.create(
        'success', 'Thành công', `Tạo mới thể loại thành công!`
      );
      this.category_service.get_category().subscribe((res:any)=>{
        this.isLoading = false;
        this.categories = res;
      }) 
    }, error=>{
      this.isLoading = false;
      this.notification.create(
        'error', 'Thất bại', `${error.error.error_message}`
      );
    })
  }

  search(){
    for (const i in this.search_form.controls) {
      this.search_form.controls[i].markAsDirty();
      this.search_form.controls[i].updateValueAndValidity();
    }

    let name = this.search_form.controls['search_name'].value;
    if(name === null){
      return;
    }

    this.isLoading = true;
    this.category_service.search(name).subscribe((res:any)=>{
      this.categories = res;
      this.isLoading = false;
    })

  }

  reset_form(){
    this.search_form.reset();
    this.isLoading = true;
    this.category_service.get_category().subscribe((res:any)=>{
      this.categories = res;
      this.isLoading = false;
    }) ;
  }

}
