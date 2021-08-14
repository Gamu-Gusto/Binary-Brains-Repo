import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnInit {


  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onApprove(approveModal) {
    this.modalService.open(approveModal, { centered: true });

  }

  confirmApprove(approveModal){
    // this.route.navigate(['/d']);
    this.modalService.dismissAll(approveModal);
    this.toastr.success('Refund Approved', 'Success')
    this.toastr.info('Could not Approve Refund', 'Info')

  }

  onDecline(declineModal){
    this.modalService.open(declineModal, { centered: true });
  }

  confirmDecline(declineModal){
    // this.route.navigate(['/delete-user']);
    this.modalService.dismissAll(declineModal);
    this.toastr.success('Refund Declined', 'Success')
    this.toastr.info('Could not decline Refund', 'Info')
  }

}

