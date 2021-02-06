import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from '../Models/Student.model';
import { AuthService } from '../Services/admin.service';


@Component({
  selector: 'app-panel-student',
  templateUrl: './panel-student.component.html',
  styleUrls: ['./panel-student.component.css']
})
export class PanelStudentComponent implements OnInit {
  @Input() student!: Student;
 
  isLogged!: boolean;

 // private userNameSub!: Subscription;
  private logStatus!: Subscription;  //需要配合在类上声明 implements OnDestroy才能使用unsubscribe

  constructor(private _router: Router,
              private _studentAdmin:AuthService
              ) { }

  ngOnInit(){
    this.isLogged = this._studentAdmin.getIsAuth();
    console.log(this.isLogged);

    //声明获得登陆者数据和状态，第一次启动ngOnInit时下面程序不会更新，要第二次启动时才更新，logout时更新
    this.logStatus = this._studentAdmin.getAuthStatus()
                     .subscribe(logdata => {
                       this.isLogged = logdata;
                       console.log("panel status: " + this.isLogged);
                     });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.logStatus.unsubscribe();
  }

  viewStudent(){
    this._router.navigate(['/detail',this.student.mongoid]);
  }
  
  editStudent(){
    this._router.navigate(['/update',this.student.mongoid]);
  }
}
