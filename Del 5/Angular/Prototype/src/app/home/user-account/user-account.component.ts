import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  user: any;

  userAccountForm: FormGroup;

  imageForm: FormGroup;
  formSubmitted: boolean;
  loggedInUser: any;


  constructor(private route: Router, private modalService: NgbModal
    , private toastr: ToastrService
    , public data: DataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('LoggedinUser'));

    this.userAccountForm = this.formBuilder.group({
      artistBio: [''],
      suburbID: [''],
      timestamp: [''],
      userAddressLine1: [''],
      userAddressLine2: [''],
      userDOB: [''],
      userEmail: [''],
      userFirstName: [''],
      userID: [''],
      userLastName: [''],
      userName: [''],
      userPassword: [''],
      userPhoneNumber: [''],
      userPostalCode: [''],
      userTypeID:[''],
      

    });

    this.imageForm = this.formBuilder.group({
      ImageID: [''],
    ImageContent: [''],
    ImageTypeID: [''],
    UserID:[''],

    });

    this.userAccountForm.patchValue(this.user);




    console.log(this.userAccountForm.value);
  }

  this

  onUpdateUser(updateUserModal) {
    this.modalService.open(updateUserModal, { centered: true });
  }

  onSubmit(event){

    

    this.formSubmitted = true;
    
    event.preventDefault();
    console.log(this.userAccountForm.value);

    if (this.userAccountForm.invalid) {
      return;
    }
    else {

      console.log(this.userAccountForm.value);

    this.data.updateUser(this.userAccountForm.value).then(success => {

        this.data.loginInUserData = this.userAccountForm.value;

        localStorage.setItem('LoggedinUser',JSON.stringify(this.data.loginInUserData));
     

        this.toastr.success("User Profile Updated Successful", 'Success', {
          disableTimeOut: true,
          tapToDismiss: false,
          closeButton: true,
          positionClass: 'toast-top-full-width',



        });


        this.formSubmitted = false;     


      }).catch(error => {

        console.log(error);

        this.toastr.error(error, 'Error', {
          disableTimeOut: true,
          tapToDismiss: false,
          closeButton: true,
          positionClass: 'toast-top-full-width',
          enableHtml: true

        });

        console.log(error);

      });



    }

}

  backHome(event){

    console.log(this.userAccountForm.value);

    this.data.loginInUserData = this.userAccountForm.value

    this.loggedInUser = JSON.parse(localStorage.getItem('LoggedinUser'));

    this.route.navigate(['/home']);

  }

}
