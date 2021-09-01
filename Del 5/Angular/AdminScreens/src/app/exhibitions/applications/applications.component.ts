import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  constructor(private toastr: ToastrService, private route: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onAccept(acceptModal) {
    this.modalService.open(acceptModal, { centered: true });

  }
  onDecline(declineModal){
    this.modalService.open(declineModal, { centered: true });
  }


  confirmAccept(acceptModal){
    this.modalService.dismissAll(acceptModal);
    // this.toastr.success('Application Accepted', 'Success')
    this.toastr.success('Report Generated Successfully', 'Succeess')
    this.toastr.success('Report Printed Successfully', 'Succeess')
    this.toastr.info('Report Generation unsuccessful', 'Failed')
    this.toastr.info('Report Print unsuccessful', 'Failed')

  }

  confirmDecline(declineModal){
    this.modalService.dismissAll(declineModal);
    this.toastr.error('Application Declined', 'Declined')

  }

}
