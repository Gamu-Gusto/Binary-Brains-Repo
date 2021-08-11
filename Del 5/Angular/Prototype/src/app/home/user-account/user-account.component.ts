import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

 
  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onUpdateUser(updateUserModal) {
    this.modalService.open(updateUserModal, { centered: true });
  }

  submitUpdateUser (updateUserModal) {
    this.route.navigate(['/home']);
    this.modalService.dismissAll(updateUserModal);
    this.toastr.success('Update User Profile Successful', 'Success')
  }

}
