import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  updateTeacher(teacherModal) {
    this.modalService.open(teacherModal, { centered: true });

  }

  confirmUpdateTeacher(teacherModal){
    this.route.navigate(['/view-teachers']);
    this.modalService.dismissAll(teacherModal);
    this.toastr.success('Teacher Successfully Updated', 'Success')
    this.toastr.info('Could Not Update Teacher', 'Info')
  }

  onCancel(cancelTeacherModal){
    this.modalService.open(cancelTeacherModal, {centered: true});
  }

  confirmCancel(cancelTeacherModal){
    this.route.navigate(['/view-teachers']);
    this.modalService.dismissAll(cancelTeacherModal);
 
  }
}
