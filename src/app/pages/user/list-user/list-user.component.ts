import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'nz-demo-table-expand',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  list_of_user = [];
  
  mapOfExpandData: { [key: string]: boolean } = {};
  listOfDisplayData: Array<{ name: string; age: number; address: string; [key: string]: string | number }> = [];

  ngOnInit(): void {
    this.user_service.get_user().subscribe( (res: any) =>{
      this.list_of_user = res
    });
  }

  constructor(public user_service: UserService) {}
  
}
