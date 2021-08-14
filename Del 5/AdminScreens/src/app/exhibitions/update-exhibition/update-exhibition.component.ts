import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-exhibition',
  templateUrl: './update-exhibition.component.html',
  styleUrls: ['./update-exhibition.component.scss']
})
export class UpdateExhibitionComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addAnnouncement(announcementModal) {
    this.modalService.open(announcementModal, { centered: true });

  }

  confirmAnnouncement(announcementModal){
    this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll(announcementModal);
    this.toastr.success('Exhibition updated Successfully', 'Success')
    this.toastr.info('Could not Update Exhibition', 'Info')

  }

  onCancel(cancelModal) {
    this.modalService.open(cancelModal, { centered: true });

  }

  confirmCancel(cancelModal){
    this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll(cancelModal);
    // this.toastr.success('Exhibition created Successfully', 'Success')
  }

}
