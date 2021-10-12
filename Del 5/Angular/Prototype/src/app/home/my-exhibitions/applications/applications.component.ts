import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../data.service';
import { ExhibitionApplication } from '../../../model/Exhibitions/exhibition-application';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  listMyApplication: any;
  listAllApplications: any;
  listExhibition: any;
  loggedInUser: any;

  constructor(
    private route: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public data: DataService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.data.getApplications().then((result) => {
      console.log(result);

      this.listAllApplications = result;

      this.loggedInUser = JSON.parse(localStorage.getItem('LoggedinUser'));

      console.log(this.loggedInUser);

      this.listMyApplication = this.listAllApplications.filter(
        (application: ExhibitionApplication) =>
          application.userID === this.loggedInUser.userID
      );

      localStorage.setItem(
        'UserApplications',
        JSON.stringify(this.listMyApplication)
      );

      console.log(this.listMyApplication);
    });
  }

  cancelApplication(cancelApplicationModal) {
    this.modalService.open(cancelApplicationModal, { centered: true });
  }

  confirmCancel(cancelApplicationModal) {
    // this.route.navigate(['/home/art-classes']);
    this.modalService.dismissAll(cancelApplicationModal);
    this.toastr.success('Application Successfully Cancelled', 'Success');
    this.toastr.error('Could not Cancel', 'Error');
  }

  selectedApp(application) {
    localStorage.setItem('SelectedApplication', JSON.stringify(application));

    this.route.navigate(['/home/my-exhibitions/my-application']);
  }
}
