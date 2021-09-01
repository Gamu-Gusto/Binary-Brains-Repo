import { Component, OnInit ,ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';
import { ArtClass } from 'src/app/model/ArtClasses/art-class';
import { ArtClassType } from 'src/app/model/ArtClasses/art-class-type';
import { ClassTeacher } from 'src/app/model/ArtClasses/class-teacher';
import { Organisation } from 'src/app/model/Exhibitions/organisation';
import { Venue } from 'src/app/model/Exhibitions/venue';


@Component({
  selector: 'app-art-class',
  templateUrl: './art-class.component.html',
  styleUrls: ['./art-class.component.scss']
})
export class ArtClassComponent implements OnInit{

 artClass: ArtClass;

 teacher: any;
 artVenue: any;
 artClassType: any;
 artOrganisation: any;

 classTeacher: ClassTeacher;

 classType: ArtClassType;

 venue: Venue;

 organisation: Organisation;

listartclass: Array<ArtClass> = []
listteacher: Array<ClassTeacher> = []
listartclasstype: Array<ArtClassType> = []
listartvenue: Array<Venue> = []
listorganisation: Array<Organisation> = []

  constructor(public data: DataService,private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }


 thartClass = this.data.sharedData;



  ngOnInit(): void {

    this.artClass = this.data.sharedData;
    this.setValues();
    this.teacher = this.data.getTeacher(this.artClass.classTeacherID).then((result) => { console.log(result); this.classTeacher = result });
    this.artVenue = this.data.getVenue(this.artClass.venueID).then((result) => { console.log(result); this.venue = result });
    this.artClassType = this.data.getClassType(this.artClass.artClassTypeID).then((result) => { console.log(result); this.classType = result });
    this.artOrganisation = this.data.getOrganisation(this.artClass.organisationID).then((result) => { console.log(result); this.organisation = result });




this.listartclass.push(this.artClass);


    console.log(this.classTeacher);

  }

  setValues(){

    
    this.listteacher.push(this.classTeacher);
    this.listartvenue.push(this.artVenue);
    this.listartclasstype.push(this.artClassType);
    this.listorganisation.push(this.artOrganisation);

    console.log( this.listartclass)

  }

  onBooking(bookModal) {
    this.modalService.open(bookModal, { centered: true });
  }

  submitBooking (bookModal) {
    this.route.navigate(['/home/art-classes']);
    this.modalService.dismissAll(bookModal);
    this.toastr.success('Booking Successful', 'Success')
  }

}
