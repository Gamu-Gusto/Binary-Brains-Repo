import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onDeleteClass(deleteClassModal) {
    this.modalService.open(deleteClassModal, { centered: true });

  }

  confirmDeleteClass(deleteClassModal){
    // this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll(deleteClassModal);
    this.toastr.success('Art Class Successfully Deleted', 'Success');
    this.toastr.info('Could Not Delete Art Class', 'Info')
  }

}
