import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Student } from '../Models/Student.model';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../Services/crud.service';
import { Location } from '@angular/common';
import { now } from 'mongoose';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  isLogged!: boolean;
  private logStatus!: Subscription; 
  registerdate!: string;

  student: Student = {
    mongoid: '',
    FirstName: '',
    LastName: '',
    Gender: '',
    BirthDate: '',
    RegisterDate: '',
    Email: '',
    Program: '',
    Branch: '',
    PhotoPath: '',
    DocumentPath: ''
  };
  constructor(private _studentCRUD: CrudService,
              private _studentAdmin:AuthService,
              private router:Router,
              private location: Location) { }

  ngOnInit(): void {
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

  addNewStudent(
    firstname: string,
    lastname: string,
    gender: string,
    birthdate: string,
    email: string,
    program: string,
    branch: string,
    photopath: string,
    documentpath: string
  ) {  
    this.registerdate = new Date(Date.now()).toString();

    this._studentCRUD.addStudent(
      firstname,
      lastname,
      gender,
      birthdate,
      this.registerdate,
      email,
      program,
      branch,
      photopath,
      documentpath
    ).subscribe();
    this.location.back();
  }

  cancel() {
    if (window.confirm("Adding student not completed, are you sure to leave the page?")) {
      this.location.back();
    };
  }
}
