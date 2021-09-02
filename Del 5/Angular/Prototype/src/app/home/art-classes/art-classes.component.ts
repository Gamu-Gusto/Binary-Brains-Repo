import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';
import { ArtClass } from 'src/app/model/ArtClasses/art-class';
import { ArtClassType } from 'src/app/model/ArtClasses/art-class-type';
import { ClassTeacher } from 'src/app/model/ArtClasses/class-teacher';
import { Organisation } from 'src/app/model/Exhibitions/organisation';
import { Venue } from 'src/app/model/Exhibitions/venue';


@Component({
  selector: 'app-art-classes',
  templateUrl: './art-classes.component.html',
  styleUrls: ['./art-classes.component.scss']
})
export class ArtClassesComponent implements OnInit {

  listArtClasses: any;
  artclass : ArtClass;
  classTeacher: ClassTeacher;

  classType: ArtClassType;
 
  venue: Venue;
 
  organisation: Organisation;

g
  constructor(public data: DataService,private formBuilder: FormBuilder,private fb: FormBuilder, 
    private toastr: ToastrService, private router: Router,private calendar: NgbCalendar) { }





  
  ngOnInit(): void {

    this.data.getAllArtClasses().then((result) => { console.log(result); this.listArtClasses = result });
  }


  getArtClass(artclassro){

    this.data.sharedData = artclassro;

    this.router.navigate(['/home/art-class']);
  
  }




}
