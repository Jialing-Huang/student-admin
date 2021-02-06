import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Models/Admin.model';
import { AuthService } from '../Services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  admin:Admin = {
    Email:'',
    Password:''  
  };
  constructor(private auth:AuthService,
              private router:Router
    ) { }

  ngOnInit(): void {
  }

  register(email: string, password: string) {
    this.auth.addAdmin(email, password)
      .subscribe(
        data => {
          console.log(data.message);
          console.log(data.response);
          console.log("Register done!");
          this.router.navigate(["/login"]);

          /* else {
            console.log("Incorrect feed back during register!");
          } */

        },
        err => console.error(err)
      )
  }

}
