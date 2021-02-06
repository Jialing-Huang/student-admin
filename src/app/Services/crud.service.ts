import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Student } from '../Models/Student.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  servicelist: Student[] = [];
  newStudent: Student = {
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

  constructor(private http: HttpClient) { }


  //  .pipe(map(),catchError())是一种标准写法，但是这里连用两层.map()
  //  是因为数据库里的单个object结构和函数需要返回Student[]中的object不一样，数据库里多了_v项
  //  以及不同格式的_id，所以用两层.map()来转换

  getStudents(): Observable<Student[]> {
    return this.http.get<{ students: any }>("http://localhost:8080/student/students")
      .pipe(
        map(data => {
          return data.students
            .map((item: { _id: { toString: () => any; }; FirstName: any; LastName: any; Gender: any; BirthDate: any; RegisterDate: any; Email: any; Program: any; Branch: any; PhotoPath: any; DocumentPath: any; }) => {
              return {
                mongoid: item._id.toString(),
                FirstName: item.FirstName,
                LastName: item.LastName,
                Gender: item.Gender,
                BirthDate: item.BirthDate,
                RegisterDate: item.RegisterDate,
                Email: item.Email,
                Program: item.Program,
                Branch: item.Branch,
                PhotoPath: item.PhotoPath,
                DocumentPath: item.DocumentPath
              }
            }
            )
        }
        ),
        catchError(error => { return throwError(error); })
      );
  }

  //  同上，这里只需要用一层.map()来转换
  getStudentItem(mongoid: string): Observable<Student> {
    return this.http.get<{ detail: any }>("http://localhost:8080/student/student/" + mongoid)
      .pipe(
        map(item => {
          return {
            mongoid: item.detail._id.toString(),
            FirstName: item.detail.FirstName,
            LastName: item.detail.LastName,
            Gender: item.detail.Gender,
            BirthDate: item.detail.BirthDate,
            RegisterDate: item.detail.RegisterDate,
            Email: item.detail.Email,
            Program: item.detail.Program,
            Branch: item.detail.Branch,
            PhotoPath: item.detail.PhotoPath,
            DocumentPath: item.detail.DocumentPath
          }
        }),
        catchError(error => { return throwError(error); })
      );
  }

  addStudent(
    firstname: string,
    lastname: string,
    gender: string,
    birthdate: string,
    registerdate: string,
    email: string,
    program: string,
    branch: string,
    photopath: string,
    documentpath: string
  ): Observable<Student[]> {
    this.newStudent.FirstName = firstname;
    this.newStudent.LastName = lastname;
    this.newStudent.Gender = gender;
    this.newStudent.BirthDate = birthdate;
    this.newStudent.RegisterDate = registerdate;
    this.newStudent.Email = email;
    this.newStudent.Program = program;
    this.newStudent.Branch = branch;
    this.newStudent.PhotoPath = photopath;
    this.newStudent.DocumentPath = documentpath;

    this.http.post<{ student: any }>("http://localhost:8080/student/add", this.newStudent)
      .pipe(
        catchError(error => { return throwError(error); })
      )
      .subscribe(
        item => this.newStudent.mongoid = item.student._id.toString(),
        err => console.error(err),
        () => this.servicelist.push(this.newStudent)
      );

    return of(this.servicelist);
  }

  updateStudent(
    mongoid: string,
    firstname: string,
    lastname: string,
    gender: string,
    birthdate: string,
    registerdate: string,
    email: string,
    program: string,
    branch: string,
    photopath: string,
    documentpath: string
  ): Observable<any> {
    const updatingContent: Student = {
      mongoid: mongoid,
      FirstName: firstname,
      LastName: lastname,
      Gender: gender,
      BirthDate: birthdate,
      RegisterDate: registerdate,
      Email: email,
      Program: program,
      Branch: branch,
      PhotoPath: photopath,
      DocumentPath: documentpath
    };

    return this.http.patch<{ message: string }>("http://localhost:8080/student/update/" + mongoid, updatingContent)
      .pipe(
        catchError(error => { return throwError(error); })
      );
  }

  deleteStudent(mongoid: string): Observable<any> {
    return this.http.delete<{ message: string }>("http://localhost:8080/student/delete/" + mongoid)
      .pipe(
        catchError(error => { return throwError(error); })
      );
  }
}
