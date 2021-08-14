import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mediums',
  templateUrl: './mediums.component.html',
  styleUrls: ['./mediums.component.scss']
})
export class MediumsComponent implements OnInit {

  constructor(private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addMedium(addMediumModal) {
    this.modalService.open(addMediumModal, { centered: true });

  }

  confirmMedium(addMediumModal){
    this.modalService.dismissAll(addMediumModal);
    this.toastr.success('Medium Successfully Added', 'Success')
    this.toastr.info('Could Not Add New Medium', 'Info')
  }

  onDeleteMedium(deleteMediumModal) {
    this.modalService.open(deleteMediumModal, { centered: true });

  }

  confirmDeleteMedium(deleteMediumModal){
    // this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll(deleteMediumModal);
    this.toastr.success('Medium Successfully Deleted', 'Success')
    this.toastr.info('Could Not Delete Medium', 'Info')
  }

}