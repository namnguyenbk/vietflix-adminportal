import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { InformService } from 'src/app/services/inform.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-inform',
  templateUrl: './list-inform.component.html',
  styleUrls: ['./list-inform.component.css']
})
export class ListInformComponent implements OnInit {

  constructor(public inform_service: InformService, private fb: FormBuilder, private notification: NzNotificationService,
    private modalService: NzModalService, private router: Router) { }

  ngOnInit() {
  }


}
