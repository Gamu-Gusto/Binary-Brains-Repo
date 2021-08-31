import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-add-artwork',
  templateUrl: './add-artwork.component.html',
  styleUrls: ['./add-artwork.component.scss']
})
export class AddArtworkComponent implements OnInit {

  addArtworkForm: FormGroup;
  public Artwork : FormControl = new FormControl(); 

  constructor(public data: DataService,private route: Router, private modalService: NgbModal, private toastr: ToastrService,private formBuilder: FormBuilder,private fb: FormBuilder) {

    this.addArtworkForm = new FormGroup({
      ArtworkID: new FormControl(''),
      ArtworkTitle: new FormControl(''),
      ArtworkPrice: new FormControl(''),
      ArtworkPicture: new FormControl(''),
  
      SurfaceType: new FormControl(''),
  
      MediumType: new FormControl(''),
  
      ArtworkStatus: new FormControl(''),
  
      FrameColour: new FormControl(''),
  
      ArtworkDimension: new FormControl(''),

    });





   }

  ngOnInit(): void {

    this.addArtworkForm = this.formBuilder.group({
      ArtworkID: [''],
      ArtworkTitle: [''],
      ArtworkPrice: [''],
      ArtworkPicture: [''],
  
      SurfaceType: [''],
  
      MediumType: [''],
  
      ArtworkStatus: [''],
  
      FrameColour: [''],
  
      ArtworkDimension: [''],

    });



  }

}
