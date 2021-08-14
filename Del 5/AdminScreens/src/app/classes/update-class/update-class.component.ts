import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.scss']
})
export class UpdateClassComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  updateClass(updateClassModal) {
    this.modalService.open(updateClassModal, { centered: true });

  }

  confirmUpdateClass(updateClassModal){
    this.route.navigate(['/classes']);
    this.modalService.dismissAll(updateClassModal);
    this.toastr.success('Art Class updated Successfully', 'Success')
    this.toastr.info('Could Not Update Art Class', 'Info')

  }

  onCancel(cancelModal) {
    this.modalService.open(cancelModal, { centered: true });

  }

  confirmCancel(cancelModal){
    this.route.navigate(['/classes']);
    this.modalService.dismissAll(cancelModal);
    // this.toastr.success('Exhibition created Successfully', 'Success')
  }

}
