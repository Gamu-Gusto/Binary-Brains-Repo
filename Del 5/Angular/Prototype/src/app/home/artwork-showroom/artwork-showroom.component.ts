import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-artwork-showroom',
  templateUrl: './artwork-showroom.component.html',
  styleUrls: ['./artwork-showroom.component.scss']
})
export class ArtworkShowroomComponent implements OnInit {

  listArtwork:any;

 

  constructor(public data: DataService,private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.data.getAllArtwork().then((result) => { console.log(result); 
      this.listArtwork = result ;

  });

   


  }



}
