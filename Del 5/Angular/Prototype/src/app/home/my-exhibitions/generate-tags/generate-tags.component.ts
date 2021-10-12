import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../data.service';
import { ApplicationTag } from '../../../model/Applications/application-tag';

@Component({
  selector: 'app-generate-tags',
  templateUrl: './generate-tags.component.html',
  styleUrls: ['./generate-tags.component.scss']
})
export class GenerateTagsComponent implements OnInit {

  public ApplicationTag: FormControl = new FormControl();
  applicationTagForm: FormGroup;

  error_messages = {
   
    'applicationArtworkTitle': [
      { type: 'required', message: 'Title is required.' }
    ],
    'medium': [
      { type: 'required', message: 'Medium is required' }
    ],

    'applicationDimension': [
      { type: 'required', message: 'Dimensions are required' }
     
    ],
    'price': [
      { type: 'required', message: 'Price is required.' }
     
    ],
   
  }
  
  errorMessage: any;
  formSubmitted: boolean;
  selectedApplication: any;
  listAllApplicationTags: any;
  listSelectedApplicationTag: any;
  loggedInUser: any;

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService,public data: DataService
    , private formBuilder: FormBuilder, private fb: FormBuilder,public datepipe: DatePipe) {

    this.applicationTagForm = new FormGroup({
      applicationTagID: new FormControl(''),
      applicationArtworkTitle: new FormControl(''),
      medium: new FormControl(''),
      applicationDimension: new FormControl(''),
      price: new FormControl(''),
      exhibitionApplicationID: new FormControl('')
      });


   }

  ngOnInit(): void {

    this.data.getAllApplicationTags().then((result) => { 
       
      console.log(result);

      this.listAllApplicationTags = result

      this.selectedApplication = JSON.parse(localStorage.getItem('SelectedApplication'));

      this.loggedInUser = JSON.parse(localStorage.getItem('LoggedinUser'));

      console.log(this.selectedApplication );
    
      this.listSelectedApplicationTag  = this.listAllApplicationTags.filter((applicationtag: ApplicationTag) => applicationtag.exhibitionApplicationID === this.selectedApplication.exhibitionApplicationID);

      console.log(this.listSelectedApplicationTag);

    });

    this.applicationTagForm = this.formBuilder.group({
      applicationTagID: [''],
      applicationArtworkTitle: ['', Validators.required],
      medium: ['', Validators.required],
      applicationDimension: ['', Validators.required],
      price: ['', Validators.required],
      exhibitionApplicationID: [''],
      });
  }

  addTag(addTagModal) {
    this.modalService.open(addTagModal, { centered: true });

  }

  onConfirmTag(addTagModal,event){

    console.log(this.applicationTagForm.value)


    this.selectedApplication = JSON.parse(localStorage.getItem('SelectedApplication'));

    console.log(this.selectedApplication);

 

    this.formSubmitted = true;


    this.applicationTagForm.get('exhibitionApplicationID').setValue(this.selectedApplication.exhibitionApplicationID) ;
    

     console.log(this.applicationTagForm.value);

     if (this.applicationTagForm.invalid) {

      return;
    }
    
    else {

  

    this.data.addApplicationTag(this.applicationTagForm.value).then(success => {

      

      this.toastr.success('Tag Successfully added', 'Success', {
         disableTimeOut: true,
          tapToDismiss: false,
          closeButton: true,
          positionClass: 'toast-top-full-width',

        });

        this.modalService.dismissAll(addTagModal);

        this.ngOnInit();


      this.formSubmitted = false;     


      }).catch(error => {

        console.log(error);
        this.modalService.dismissAll(addTagModal);
        
        this.toastr.error(error.error, 'Error', {
          disableTimeOut: true,
          tapToDismiss: false,
          closeButton: true,
          positionClass: 'toast-top-full-width',
          enableHtml: true

        });

       
        this.ngOnInit();
        
      
      });
  }
  }
  deleteTag(deleteTagModal) {
    this.modalService.open(deleteTagModal, { centered: true });

  }

  confirmDeleteTag(deleteTagModal){
    // this.route.navigate(['/home/art-classes']);
    this.modalService.dismissAll(deleteTagModal);
    this.toastr.success('Tag Deleted Successfully', 'Success')
    this.toastr.error('Could Not Delete Tag', 'Error')

  }

}