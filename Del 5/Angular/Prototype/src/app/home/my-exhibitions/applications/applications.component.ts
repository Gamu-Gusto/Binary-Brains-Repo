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
<<<<<<< HEAD
  listMyApplication: any;
  listAllApplications: any;
  listExhibition: any;
=======
  
listMyApplication:any;
listAllApplications: any;
>>>>>>> d3ade780aad356f8155d327b0c1b0d7133c446dd
  loggedInUser: any;
  cancelModal: any;

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

<<<<<<< HEAD
  confirmCancel(cancelApplicationModal) {
    // this.route.navigate(['/home/art-classes']);
    this.modalService.dismissAll(cancelApplicationModal);
    this.toastr.success('Application Successfully Cancelled', 'Success');
    this.toastr.error('Could not Cancel', 'Error');
=======
  confirmCancel(cancelApplicationModal,application){
    // this.route.navigate(['/home/art-classes']);


    this.data.cancelApplication(application.exhibitionApplicationID).then(success => {

      this.toastr.success("Application has been cancelled", 'Success', {
          disableTimeOut: false,
          tapToDismiss: false,
          closeButton: true,
          positionClass: 'toast-top-full-width',



        });
        this.modalService.dismissAll(cancelApplicationModal);

        this.ngOnInit();

        this.route.navigate(['/home/my-exhibitions/applications']);

      }).catch(error => {

  console.log(error.error);

        this.toastr.error(error.error, 'Error', {
          disableTimeOut: false,
          tapToDismiss: false,
          closeButton: true,
          positionClass: 'toast-top-full-width',
          enableHtml: true

        });

        this.modalService.dismissAll(cancelApplicationModal);

        this.ngOnInit();

        this.route.navigate(['/home/my-exhibitions/applications']);

      });



>>>>>>> d3ade780aad356f8155d327b0c1b0d7133c446dd
  }

  selectedApp(application) {
    localStorage.setItem('SelectedApplication', JSON.stringify(application));



    this.route.navigate(['/home/my-exhibitions/my-application']);
<<<<<<< HEAD
  }
=======
  };

  generateTag(application){


    localStorage.setItem('SelectedApplication',JSON.stringify(application));



    this.route.navigate(['/home/my-exhibitions/generate-tags']);

  }

>>>>>>> d3ade780aad356f8155d327b0c1b0d7133c446dd
}
