import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.scss']
})
export class ExhibitionsComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onDeleteExhibition(deleteExhibitionModal) {
    this.modalService.open(deleteExhibitionModal, { centered: true });

  }

  confirmDeleteExhibition(deleteExhibitionModal){
    // this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll(deleteExhibitionModal);
    this.toastr.success('Exhibition Successfully Deleted', 'Success')
    this.toastr.info('Could Not Delete Exhibition', 'Info')
  }

}
