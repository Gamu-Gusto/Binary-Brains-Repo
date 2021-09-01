import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClassTeacher } from 'src/app/model/ArtClasses/class-teacher';
import { TeacherType } from 'src/app/model/ArtClasses/teacher-type';
import { TeacherService } from 'src/app/shared/ArtClasses/teacher.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
teacher: ClassTeacher;
teacherTypeList: TeacherType[];
  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService, public teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getTeacherTypes();
  }

  addTeacher(teacherModal) {
    this.modalService.open(teacherModal, { centered: true });
  }

  getTeacherTypes(){
    this.teacherService.getTeacherType().subscribe(res => {
      this.teacherTypeList = res as TeacherType[];
      console.log(this.teacherTypeList);
    })
  }

  selectType($event) {
    this.teacherTypeList.forEach(type => {
      if(type.teacherTypeID == $event){
        this.teacher.teacherType.teacherTypeID = type.teacherTypeID;
      }
    })
  }

  onSubmit(form:NgForm){
    this.teacherService.postTeacher().subscribe(res => {
      this.refreshForm(form);
      this.route.navigate(['/view-teachers']);
      this.teacherService.getTeachers();
    })
  }

  refreshForm(form: NgForm) {
    form.form.reset();
    this.teacherService.teacherData = new ClassTeacher();
    this.modalService.dismissAll();
    this.toastr.success('Teacher Successfully Added', 'Success')
  }

  confirmTeacher(teacherModal){
    
    this.modalService.dismissAll(teacherModal);
    this.toastr.success('Teacher Successfully added', 'Success')
    this.toastr.info('Could Not Add Teacher', 'Info')
  }

  onCancel(cancelTeacherModal){
    this.modalService.open(cancelTeacherModal, {centered: true});
  }

  confirmCancel(){
    this.route.navigate(['/view-teachers']);
    this.modalService.dismissAll();
 
  }



}
