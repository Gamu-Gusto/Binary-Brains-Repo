import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClassTeacher } from 'src/app/model/ArtClasses/class-teacher';
import { TeacherType } from 'src/app/model/ArtClasses/teacher-type';
import { TeacherService } from 'src/app/shared/ArtClasses/teacher.service';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent implements OnInit {
  teacherTypeList: TeacherType[];
  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService, public teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getTeacherTypes();
  }

  getTeacherTypes(){
    this.teacherService.getTeacherType().subscribe(res => {
      this.teacherTypeList = res as TeacherType[];
      console.log(this.teacherTypeList);
    })
  }

  updateTeacher(teacherModal) {
    this.modalService.open(teacherModal, { centered: true });
  }

  onSubmit(form: NgForm){
    this.teacherService.putTeacher().subscribe( res => {
      this.teacherService.getTeachers();
      this.refreshFrom(form);
    })
  }

  refreshFrom(form: NgForm) {
    form.form.reset();
    this.teacherService.teacherData = new ClassTeacher();
    this.route.navigate(['/view-teachers']);
    this.modalService.dismissAll();
    this.toastr.success('Teacher Successfully Updated', 'Success')
    // this.toastr.info('Could Not Update Teacher', 'Info')
  }

  // confirmUpdateTeacher(teacherModal){

  // }

  onCancel(cancelTeacherModal){
    this.modalService.open(cancelTeacherModal, {centered: true});
  }

  confirmCancel(cancelTeacherModal){
    this.route.navigate(['/view-teachers']);
    this.modalService.dismissAll(cancelTeacherModal);
 
  }
}
