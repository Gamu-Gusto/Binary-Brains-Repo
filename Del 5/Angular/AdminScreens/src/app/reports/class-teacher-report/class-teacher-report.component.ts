import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-teacher-report',
  templateUrl: './class-teacher-report.component.html',
  styleUrls: ['./class-teacher-report.component.scss']
})
export class ClassTeacherReportComponent implements OnInit {

  teachers;
  teacher;
  classes;
  class;

  constructor(private httpService: HttpClient) { }

  ngOnInit(): void {
    this.httpService.get('https://localhost:44312/api/ClassTeachers').subscribe (res => {
      this.teachers = res as string [];
      console.log(this.teachers = res as string [])
    });
    this.httpService.get('https://localhost:44312/api/ArtClasses').subscribe (res => {
      this.classes = res as string [];
      console.log(this.classes = res as string [])
    });

  }

  getTeacher(ClassTeacherID){
    this.httpService.get('https://localhost:44312/api/Teacher/getTeacherClasses/' + ClassTeacherID).subscribe (res => {
      this.teacher = res as string [];
      console.log(this.teacher = res as string [])
    });
  }

  getClass(ArtClassID){
    this.httpService.get('https://localhost:44312/api/ArtClasses/getArtClasses/' + ArtClassID).subscribe (res => {
      this.class = res as string [];
      console.log(this.class = res as string [])
    });
  }

  isShown: boolean = false ;
  showTable() {

    this.isShown = true;
    
    }
  
  hideTable(){
    this.isShown = false;
  }

}

