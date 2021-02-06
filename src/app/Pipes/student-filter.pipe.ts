import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../Models/Student.model';

@Pipe({
  name: 'studentFilter'
})
export class StudentFilterPipe implements PipeTransform {
  //Input two parameters as shown in the .html file
  transform(students: Student[], searchTerm: string): Student[] {
    if(!students || !searchTerm){
      return students;
    }
    return students.filter(student => 
      student.FirstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
      //Commonly used method to find index of item which contains the searchTerm
  }

}