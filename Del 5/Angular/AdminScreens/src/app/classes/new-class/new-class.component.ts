import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ArtClass } from 'src/app/model/ArtClasses/art-class';
import { ArtClassType } from 'src/app/model/ArtClasses/art-class-type';
import { ClassTeacher } from 'src/app/model/ArtClasses/class-teacher';
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

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService, public artClassService: ArtClassService) { }

  ngOnInit(): void {
    this.getVenue();
    this.getArtClassTypes();
    this.getClassTeachers();
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

  addClass(classAnnounceModal) {
    this.modalService.open(classAnnounceModal, { centered: true });
  }

  onSubmit(form: NgForm){
    this.artClassService.postArtClass().subscribe(res => {
      this.refreshForm(form);
      this.route.navigate(['/classes']);

      this.toastr.success('Class Successfully created', 'Success')
      //this.toastr.info('Could Not Create New Art Class', 'Info')
    })
  }

  refreshForm(form: NgForm){
    form.form.reset();
    this.artClassService.artClassData = new ArtClass();
  }

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
