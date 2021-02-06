import { Component } from '@angular/core';
import { AuthService } from './Services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-admin';

  constructor(private auth:AuthService) { }

  ngOnInit(){
    //this.auth.getAuthUser();
  }
}
