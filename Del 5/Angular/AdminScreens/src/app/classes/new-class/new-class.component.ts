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
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.scss']
})
export class NewClassComponent implements OnInit {
  artClassTypeList: ArtClassType[];
  venueList: Venue[];
  teachersList: ClassTeacher[];
  organisationList: Organisation[];

  base64: string = "";
  fileSelected?:Blob;
  imageUrl?:string;

  public ArtClass: FormControl = new FormControl();
  artClassForm: FormGroup;

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService, public artClassService: ArtClassService, private formBuilder: FormBuilder) {
    this.artClassForm = new FormGroup({
      artClassID: new FormControl(0),
      artClassName: new FormControl(''),
      artClassDescription: new FormControl(''),
      artClassStartDateTime: new FormControl(''),
      artClassEndDateTime: new FormControl(''),
      artClassImage: new FormControl(''),
      classLimit: new FormControl(0),
      refundDayLimit: new FormControl(0),
      classPrice: new FormControl(0),
      artClassTypeID: new FormControl(0),
      classTeacherID: new FormControl(0),
      organisationID: new FormControl(0),
      venueID: new FormControl(0)
    });
   }

  ngOnInit(): void {

    this.artClassForm = this.formBuilder.group({
      artClassID: [0],
      artClassName: [''],
      artClassDescription: [''],
      artClassStartDateTime: [''],
      artClassEndDateTime: [''],
      artClassImage: [''],
      classLimit: [0],
      refundDayLimit: [0],
      classPrice: [0],
      artClassTypeID: [0],
      classTeacherID: [0],
      organisationID: [0],
      venueID: [0]
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

  addClass(classAnnounceModal) {
    this.modalService.open(classAnnounceModal, { centered: true });
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
    }
  }

  onSubmit(event){
    event.preventDefault();
    this.artClassService.postArtClass(this.artClassForm.value).subscribe(res => {
      this.route.navigate(['/classes']);
      this.toastr.success('Class Successfully created', 'Success')
      //this.toastr.info('Could Not Create New Art Class', 'Info')
    });
  }

  // refreshForm(form: NgForm){
  //   form.form.reset();
  //   this.artClassService.artClassData = new ArtClass();
  // }

  confirmClass(){
    this.artClassService.postAnnouncement();
    this.route.navigate(['/classes']);
    this.modalService.dismissAll();
    this.toastr.success('Class Successfully created', 'Success')
    //this.toastr.info('Could Not Create New Art Class', 'Info')
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
