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

  constructor(public data: DataService,private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }






  ngOnInit(): void {



    this.artClass = this.data.sharedData;

  
    this.listartclass.push(this.artClass);



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
