import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { PanelStudentComponent } from './panel-student/panel-student.component';
import { AuthInterceptor } from './Services/auth-interceptor';
import { StudentFilterPipe } from './Pipes/student-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListStudentComponent,
    DetailStudentComponent,
    AddStudentComponent,
    UpdateStudentComponent,
    LoginComponent,
    RegisterComponent,
    PanelStudentComponent,
    StudentFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
