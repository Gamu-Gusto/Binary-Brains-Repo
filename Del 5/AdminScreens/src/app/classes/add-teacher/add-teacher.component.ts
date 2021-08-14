import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addTeacher(teacherModal) {
    this.modalService.open(teacherModal, { centered: true });

  }

  confirmTeacher(teacherModal){
    this.route.navigate(['/view-teachers']);
    this.modalService.dismissAll(teacherModal);
    this.toastr.success('Teacher Successfully added', 'Success')
    this.toastr.info('Could Not Add Teacher', 'Info')
  }

  onCancel(cancelTeacherModal){
    this.modalService.open(cancelTeacherModal, {centered: true});
  }

  confirmCancel(cancelTeacherModal){
    this.route.navigate(['/view-teachers']);
    this.modalService.dismissAll(cancelTeacherModal);
 
  }



}
