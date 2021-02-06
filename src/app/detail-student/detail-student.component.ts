import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../Models/Student.model';
import { CrudService } from '../Services/crud.service';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {
  student!: Student;
  id!: string;
  constructor(private _route:ActivatedRoute,
              private _studentCRUD:CrudService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(gotItem => {
      if(gotItem){
        this.id =  gotItem.get('mongoid') as string;
        console.log(this.id);
        this._studentCRUD.getStudentItem(this.id).subscribe(data => this.student = data);
      }      
    })
  }

}
