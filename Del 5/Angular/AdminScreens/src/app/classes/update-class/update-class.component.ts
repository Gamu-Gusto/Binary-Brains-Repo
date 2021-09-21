import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ArtClass } from 'src/app/model/ArtClasses/art-class';
import { ArtClassType } from 'src/app/model/ArtClasses/art-class-type';
import { ClassTeacher } from 'src/app/model/ArtClasses/class-teacher';
import { Organisation } from 'src/app/model/Exhibitions/organisation';
import { Venue } from 'src/app/model/Exhibitions/venue';
import { ArtClassService } from 'src/app/shared/ArtClasses/art-class.service';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.scss']
})
export class UpdateClassComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService, public artClassService: ArtClassService, private formBuilder: FormBuilder) {
    this.artClassForm = new FormGroup({
      artClassID: new FormControl(this.artClassService.selectedArtClass.artClassID),
      artClassName: new FormControl(this.artClassService.selectedArtClass.artClassName),
      artClassDescription: new FormControl(this.artClassService.selectedArtClass.artClassDescription),
      artClassStartDateTime: new FormControl(this.artClassService.selectedArtClass.artClassStartDateTime),
      artClassEndDateTime: new FormControl(this.artClassService.selectedArtClass.artClassEndDateTime),
      artClassImage: new FormControl(this.artClassService.selectedArtClass.artClassImage),
      classLimit: new FormControl(this.artClassService.selectedArtClass.classLimit),
      refundDayLimit: new FormControl(this.artClassService.selectedArtClass.refundDayLimit),
      classPrice: new FormControl(this.artClassService.selectedArtClass.classPrice),
      artClassTypeID: new FormControl(this.artClassService.selectedArtClass.artClassType.artClassTypeID),
      classTeacherID: new FormControl(this.artClassService.selectedArtClass.classTeacher.classTeacherID),
      organisationID: new FormControl(this.artClassService.selectedArtClass.organisation.organisationID),
      venueID: new FormControl(this.artClassService.selectedArtClass.venue.venueID)
    });
   }
  artClassTypeList: ArtClassType[];
  venueList: Venue[];
  teachersList: ClassTeacher[];
  organisationList: Organisation[];

  base64: string = this.artClassService.selectedArtClass.artClassImage;
  fileSelected?:Blob;
  imageUrl?:string;

  public ArtClass: FormControl = new FormControl();
  artClassForm: FormGroup;
  
  ngOnInit(): void {
    this.artClassForm = this.formBuilder.group({
      artClassID: [this.artClassService.selectedArtClass.artClassID],
      artClassName: [this.artClassService.selectedArtClass.artClassName],
      artClassDescription: [this.artClassService.selectedArtClass.artClassDescription],
      artClassStartDateTime: [this.artClassService.selectedArtClass.artClassStartDateTime],
      artClassEndDateTime: [this.artClassService.selectedArtClass.artClassEndDateTime],
      artClassImage: [this.artClassService.selectedArtClass.artClassImage],
      classLimit: [this.artClassService.selectedArtClass.classLimit],
      refundDayLimit: [this.artClassService.selectedArtClass.refundDayLimit],
      classPrice: [this.artClassService.selectedArtClass.classPrice],
      artClassTypeID: [this.artClassService.selectedArtClass.artClassType.artClassTypeID],
      classTeacherID: [this.artClassService.selectedArtClass.classTeacher.classTeacherID],
      organisationID: [this.artClassService.selectedArtClass.organisation.organisationID],
      venueID: [this.artClassService.selectedArtClass.venue.venueID]
    });

    this.getVenue();
    this.getArtClassTypes();
    this.getClassTeachers();
    this.getOrganization();
  }

  getClassTeachers(){
    this.artClassService.getClassTeacher().subscribe(res => {
      this.teachersList = res as ClassTeacher[];
    })
  }

  getArtClassTypes(){
    this.artClassService.getArtClassType().subscribe(res => {
      this.artClassTypeList = res as ArtClassType[];
    });
  }

  getVenue(){
    this.artClassService.getVenue().subscribe(res => {
      this.venueList =  res as Venue[];
    });
  }

  getOrganization(){
    this.artClassService.getOrganisation().subscribe(res =>{
      this.organisationList = res as Organisation[];
    });
  }

  updateClass(updateClassModal) {
    this.modalService.open(updateClassModal, { centered: true });
  }


  onSelectNewFile(files: FileList){
    this.fileSelected=files[0];
    this.imageUrl= window.URL.createObjectURL(this.fileSelected)

    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
    this.base64 = reader.result as string;
    this.artClassForm.patchValue({
      artClassImage: this.base64
    });
    //this.service.driverData.driverImage = this.base64;
    }}

  onSubmit(event){
    this.artClassService.putArtClass(this.artClassForm.value).subscribe(res => {
      this.artClassService.getArtClass();
      this.route.navigate(['/classes']);
      this.modalService.dismissAll();
      this.toastr.success('Art Class updated Successfully', 'Success')
      // this.toastr.info('Could Not Update Art Class', 'Info')
    });
  }

  // refreshForm(form: NgForm) {
  //   form.form.reset();
  //   this.artClassService.artClassData = new ArtClass();
  // }

  confirmUpdateClass(){
    this.route.navigate(['/classes']);
    this.modalService.dismissAll();
    this.toastr.success('Art Class updated Successfully', 'Success')
    // this.toastr.info('Could Not Update Art Class', 'Info')
  }

  onCancel(cancelModal) {
    this.modalService.open(cancelModal, { centered: true });

  }

  confirmCancel(cancelModal){
    this.route.navigate(['/classes']);
    this.modalService.dismissAll(cancelModal);
    // this.toastr.success('Exhibition created Successfully', 'Success')
  }

}
