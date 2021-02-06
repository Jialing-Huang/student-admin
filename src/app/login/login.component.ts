import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Models/Admin.model';
import { AuthService } from '../Services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  admin:Admin = {
    Email:'',
    Password:''
  };
  localtokenbuffer!: string;
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }



  login(email:string, password:string){
    this.auth.login(email,password);             
  }
}




