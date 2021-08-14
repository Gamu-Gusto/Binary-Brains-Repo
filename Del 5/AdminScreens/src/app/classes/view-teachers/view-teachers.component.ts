import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-teachers',
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.scss']
})
export class ViewTeachersComponent implements OnInit {
  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onDeleteTeacher(classAnnounceModal) {
    this.modalService.open(classAnnounceModal, { centered: true });

  }

  confirmDelete(classAnnounceModal){
    this.route.navigate(['/view-teachers']);
    this.modalService.dismissAll(classAnnounceModal);
    this.toastr.success('Class Teacher Successfully deleted', 'Success')
    this.toastr.info('Could Not delete Class Teacher', 'Info')
  }


}