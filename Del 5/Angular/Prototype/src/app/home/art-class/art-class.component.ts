import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-art-class',
  templateUrl: './art-class.component.html',
  styleUrls: ['./art-class.component.scss']
})
export class ArtClassComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onBooking(bookModal) {
    this.modalService.open(bookModal, { centered: true });
  }

  submitBooking (bookModal) {
    this.route.navigate(['/home/art-classes']);
    this.modalService.dismissAll(bookModal);
    this.toastr.success('Booking Successful', 'Success')
  }

}
