import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.scss']
})
export class NewClassComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addClass(classAnnounceModal) {
    this.modalService.open(classAnnounceModal, { centered: true });

  }

  confirmClass(classAnnounceModal){
    this.route.navigate(['/classes']);
    this.modalService.dismissAll(classAnnounceModal);
    this.toastr.success('Class Successfully created', 'Success')
    this.toastr.info('Could Not Create New Art Class', 'Info')
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
