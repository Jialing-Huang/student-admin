import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Services/crud.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../Models/Student.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/admin.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  id!: string;
  student!: Student;
  isLogged!: boolean;

  // private userNameSub!: Subscription;
   private logStatus!: Subscription;  //需要配合在类上声明 implements OnDestroy才能使用unsubscribe

  constructor(private _route:ActivatedRoute,
              private _studentCRUD:CrudService,
              private _studentAdmin:AuthService,
              private router:Router,
              private location:Location) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(gotItem => {
      if(gotItem){
        this.id =  gotItem.get('mongoid') as string;
        console.log(this.id);
        this._studentCRUD.getStudentItem(this.id).subscribe(data => this.student = data);
      }      
    });


    this.isLogged = this._studentAdmin.getIsAuth();
    console.log(this.isLogged);

    //声明获得登陆者数据和状态，第一次启动ngOnInit时下面程序不会更新，要第二次启动时才更新，logout时更新
    this.logStatus = this._studentAdmin.getAuthStatus()
                     .subscribe(logdata => {
                       this.isLogged = logdata;
                       console.log(this.isLogged);
                       if(!this.isLogged){
                        window.alert("Time's up to logout, will return back to the main page!");
                        this.router.navigate(["/list"]);
                       };
                     });


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.logStatus.unsubscribe();
  }

  goBack(){
    this.location.back();
  }

  updatestudent(
    firstname: string,
    lastname: string,
    gender: string,
    birthdate: string,
    email: string,
    program: string,
    branch: string,
    photopath: string,
    documentpath: string
    ){
     if(window.confirm("Are you sure to update the data?")){
      this._studentCRUD.updateStudent(
        this.id,
        firstname,
        lastname,
        gender,
        birthdate,
        this.student.RegisterDate,
        email,
        program,
        branch,
        photopath,
        documentpath
        ).subscribe(data => { console.log(data.message);
                                          this.location.back();
                                        },
                                err => console.error(err)
                                )
    };   
  }

  deleteStudent(mongoid:string){
   if(window.confirm("Are you sure to delet the  data?")){
    this._studentCRUD.deleteStudent(mongoid)
                     .subscribe(data => {
                                          console.log(data.message);
                                          this.location.back();
                                        },
                                err => console.error(err)
                                )
   };  
  } 

}
