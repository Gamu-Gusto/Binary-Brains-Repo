import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onCancelBooking(cancelBookingModal) {
    this.modalService.open(cancelBookingModal, { centered: true });

  }

  confirmCancel(cancelBookingModal){
    // this.route.navigate(['/home/art-classes']);
    this.modalService.dismissAll(cancelBookingModal);
    this.toastr.success('Cancellation Successful', 'Success')
  }

  onRequestRefund(requestRefundModal) {
    this.modalService.open(requestRefundModal, { centered: true });

  }

  confirmRefund(requestRefundModal){
    // this.route.navigate(['/home/art-classes']);
    this.modalService.dismissAll(requestRefundModal);
    this.toastr.success('Request Successful', 'Success')
  }

}
