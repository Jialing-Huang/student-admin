import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../Models/Student.model';
import { CrudService } from '../Services/crud.service';
import { AuthService } from '../Services/admin.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit,OnDestroy{

  students:Student[] = [];
  searchTerm!: string;

  isLogged!: boolean;

 // private userNameSub!: Subscription;
  private logStatus!: Subscription;  //需要配合在类上声明 implements OnDestroy才能使用unsubscribe

  constructor(private _studentCRUD:CrudService,
              private _studentAdmin: AuthService,
              private router:Router) { }

  ngOnInit() {
    this.searchTerm = "";
    //获得student数据
     this._studentCRUD.getStudents().subscribe((data) => {
      this._studentCRUD.servicelist = data; 
      this.students = this._studentCRUD.servicelist;       
       console.log(this.students);
     });
   
///////////////////////////////////////////////////////////
     this._studentAdmin.getAuthUser();  //获取状态数据
///////////////////////////////////////////////////////////
     //第一次启动时通过getIsAuth函数来取得初始值，初始值在adminservice中确定
     this.isLogged = this._studentAdmin.getIsAuth();
     console.log(this.isLogged);

     //声明获得登陆者数据和状态，第一次启动ngOnInit时下面程序不会更新，要第二次启动时才更新，logout时更新
     this.logStatus = this._studentAdmin.getAuthStatus()
                      .subscribe(logdata => {
                        this.isLogged = logdata;
                        console.log(this.isLogged);
                        if(!this.isLogged){
                          window.alert("Sorry,time's up to logout!");
                        }
                      });
    
  }

  ngOnDestroy(){
    this.logStatus.unsubscribe();
  }

  onLogout(){
    this._studentAdmin.logout();
    this.router.navigate(["/login"]);
  }

  onLogin(){
    this.router.navigate(["/login"]);
  }

}
