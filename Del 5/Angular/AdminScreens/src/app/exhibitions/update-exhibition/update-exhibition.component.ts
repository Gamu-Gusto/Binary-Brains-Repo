import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Exhibition } from 'src/app/model/Exhibitions/exhibition';
import { ExhibitionType } from 'src/app/model/Exhibitions/exhibition-type';
import { Organisation } from 'src/app/model/Exhibitions/organisation';
import { Venue } from 'src/app/model/Exhibitions/venue';
import { ExhibitionService } from 'src/app/shared/Exhibitions/exhibition.service';

@Component({
  selector: 'app-update-exhibition',
  templateUrl: './update-exhibition.component.html',
  styleUrls: ['./update-exhibition.component.scss']
})
export class UpdateExhibitionComponent implements OnInit {
  exhibitionTypeList: ExhibitionType[];
  venueList: Venue[];
  organisationList: Organisation[];


  base64: string = this.exhibitionService.selectedExhibition.exhibitionImage;
  fileSelected?:Blob;
  imageUrl?:string;

  exhibition: Exhibition;
  public Exhibition: FormControl = new FormControl();
  exhibitionForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: Router, private modalService: NgbModal, private toastr: ToastrService, public exhibitionService: ExhibitionService) {
    this.exhibitionForm = new FormGroup({
      exhibitionID: new FormControl(this.exhibitionService.selectedExhibition.exhibitionID),
      exhibitionName: new FormControl(this.exhibitionService.selectedExhibition.exhibitionName),
      exhibitionDescription: new FormControl(this.exhibitionService.selectedExhibition.exhibitionDescription),
      exhibitionStartDateTime: new FormControl(this.exhibitionService.selectedExhibition.exhibitionStartDateTime),
      exhibitionEndDateTime: new FormControl(this.exhibitionService.selectedExhibition.exhibitionEndDateTime),
      exhibitionImage: new FormControl(this.exhibitionService.selectedExhibition.exhibitionImage),
      exhibitionTypeID: new FormControl(this.exhibitionService.selectedExhibition.exhibitionType.exhibitionTypeID),
      // scheduleID: new FormControl(0),
      organisationID: new FormControl(this.exhibitionService.selectedExhibition.organisation.organisationID),
      venueID: new FormControl(this.exhibitionService.selectedExhibition.venue.venueID)
    });
   }

  ngOnInit(): void {

    this.getExhibitionType();
    this.getVenue();
    this.getOrganization();

    this.exhibitionForm = this.formBuilder.group({
      exhibitionID: [this.exhibitionService.selectedExhibition.exhibitionID],
      exhibitionName: [this.exhibitionService.selectedExhibition.exhibitionName],
      exhibitionDescription: [this.exhibitionService.selectedExhibition.exhibitionDescription],
      exhibitionStartDateTime: [this.exhibitionService.selectedExhibition.exhibitionStartDateTime],
      exhibitionEndDateTime: [this.exhibitionService.selectedExhibition.exhibitionEndDateTime],
      exhibitionImage: [this.exhibitionService.selectedExhibition.exhibitionImage],
      exhibitionTypeID: [this.exhibitionService.selectedExhibition.exhibitionType.exhibitionTypeID],
      // scheduleID: [0],
      organisationID: [this.exhibitionService.selectedExhibition.organisation.organisationID],
      venueID: [this.exhibitionService.selectedExhibition.venue.venueID],
    });
  }

  getExhibitionType(){
    this.exhibitionService.getExhibitionType().subscribe( res => {
      this.exhibitionTypeList =  res as ExhibitionType[];
    })
  }

  getVenue(){
    this.exhibitionService.getVenue().subscribe(res => {
      this.venueList =  res as Venue[];
    });
  }

  getOrganization(){
    this.exhibitionService.getOrganisation().subscribe(res =>{
      this.organisationList = res as Organisation[];
    });
  }

  onSelectNewFile(files: FileList){
    this.fileSelected=files[0];
    this.imageUrl= window.URL.createObjectURL(this.fileSelected)
  
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
    this.base64 = reader.result as string;
    this.exhibitionForm.patchValue({
      exhibitionImage: this.base64
    });
    //this.service.driverData.driverImage = this.base64;
    }
  }

onSubmit(){
  this.exhibition = this.exhibitionForm.value;
  this.exhibitionService.putExhibition(this.exhibition).subscribe(res => {
    this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll();
    this.toastr.success('Exhibition updated Successfully', 'Success')
    // this.toastr.info('Could not Update Exhibition', 'Info')
  });
  // this.exhibitionService.putExhibition().subscribe( res => {
  //   this.exhibitionService.getExhibitions();
  //   this.refreshForm(form);
  //   this.route.navigate(['/exhibitions']);
  //   this.modalService.dismissAll();
  //   this.toastr.success('Exhibition updated Successfully', 'Success')
    // this.toastr.info('Could not Update Exhibition', 'Info')
  // })
}  

refreshForm(form: NgForm){
  form.form.reset();
  this.exhibitionService.exhibitionData = new Exhibition();
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
