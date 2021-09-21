import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Artwork } from '../model/Artworks/artwork';
import { ArtworkDimension } from '../model/Artworks/artwork-dimension';
import { ArtworkStatus } from '../model/Artworks/artwork-status';
import { ArtworkType } from '../model/Artworks/artwork-type';
import { FrameColour } from '../model/Artworks/frame-colour';
import { MediumType } from '../model/Artworks/medium-type';
import { SurfaceType } from '../model/Artworks/surface-type';
import { ArtworkService } from '../shared/Artrworks/artwork.service';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss']
})
export class ArtworkComponent implements OnInit {
artwork: Artwork;
mediumTypeList: MediumType[];
surfaceTypeList: SurfaceType[];
dimensionsList: ArtworkDimension[];

base64: string = "";
fileSelected?:Blob;
imageUrl?:string;

public Artwork: FormControl = new FormControl();
addArtworkForm: FormGroup;
updateArtworkForm: FormGroup;
  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService, public artworkService: ArtworkService, private formBuilder: FormBuilder) {
    this.addArtworkForm = new FormGroup({
      artworkID: new FormControl(0),
      artworkTitle: new FormControl(''),
      artworkPrice: new FormControl(''),
      artworkImage: new FormControl(''),
      surfaceTypeID: new FormControl(0),
      mediumTypeID: new FormControl(0),
      artworkStatusID: new FormControl(0),
      frameColourID: new FormControl(0),
      artworkDimensionID: new FormControl(0),
      artworkTypeID: new FormControl(0)
    });

    this.updateArtworkForm = new FormGroup({
      artworkID: new FormControl(0),
      artworkTitle: new FormControl(''),
      artworkPrice: new FormControl(''),
      artworkImage: new FormControl(''),
      surfaceTypeID: new FormControl(0),
      mediumTypeID: new FormControl(0),
      artworkStatusID: new FormControl(0),
      frameColourID: new FormControl(0),
      artworkDimensionID: new FormControl(0),
      artworkTypeID: new FormControl(0)
    });
   }

  ngOnInit(): void {
    this.artworkService.getArtworks();
    this.resetObject();
    this.getMediumTypes();
    this.getSurfaceTypes();
    this.getDimensions();
  }

  resetObject() {
    this.artwork = {
      artworkID: 0,
      artworkTitle: '',
      artworkPrice: 0,
      artworkImage: '',
      surfaceType: new SurfaceType,
      mediumType: new MediumType,
      artworkStatus: new ArtworkStatus,
      frameColour: new FrameColour,
      artworkDimension: new ArtworkDimension,
      artworkType: new ArtworkType
    }
  }

  getMediumTypes(){
    this.artworkService.getMediumType().subscribe(res => {
      this.mediumTypeList = res as MediumType[];
    });
  }

  getSurfaceTypes() {
    this.artworkService.getSurfaceType().subscribe(res => {
      this.surfaceTypeList = res as SurfaceType[];
    });
  }

  getDimensions(){
    this.artworkService.getDimensions().subscribe(res => {
      this.dimensionsList = res as ArtworkDimension[];
    });
  }

  onSelectNewFile(files: FileList){
    this.fileSelected=files[0];
    this.imageUrl= window.URL.createObjectURL(this.fileSelected)

    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
    this.base64 = reader.result as string;

    //this.service.driverData.driverImage = this.base64;
    }
  }

  addArtwork(addArtworkModal) {
    this.modalService.open(addArtworkModal, { centered: true });
    this.addArtworkForm = this.formBuilder.group({
      artworkID: [0],
      artworkTitle: [''],
      artworkPrice: [''],
      artworkImage: [''],
      surfaceTypeID: [0],
      mediumTypeID: [0],
      artworkStatusID: [1],
      frameColourID: [1],
      artworkDimensionID: [0],
      artworkTypeID: [1]
    });
  }

  onAddSubmit(){
    this.addArtworkForm.patchValue({
      artworkImage: this.base64
    });
    this.artworkService.postArtwork(this.addArtworkForm.value).subscribe(res =>{
      this.artworkService.getArtworks();
      // this.artworkService.artworkData = new Artwork();
      this.modalService.dismissAll();
      this.toastr.success('Teacher Successfully Added', 'Success')
    })
  }

  onUpdateSubmit(){
    this.updateArtworkForm.patchValue({
      artworkImage: this.base64
    });
    this.artworkService.putArtwork(this.updateArtworkForm.value).subscribe(res => {
      this.artworkService.getArtworks();
      this.modalService.dismissAll();
      this.toastr.success('Artwork updated Successfully', 'Success')
      // this.toastr.info('Could Not Update Art Class', 'Info')
    });
  }

  // refreshForm(form: NgForm) {
  //   form.form.reset();
  //   this.artworkService.artworkData = new Artwork();
  //   this.modalService.dismissAll();
  //   this.toastr.success('Teacher Successfully Added', 'Success')
  // }

  onEdit(updateArtworkModal, selectedArtwork: Artwork){
    this.modalService.open(updateArtworkModal, { centered: true });
    this.artworkService.selectedArtwork = selectedArtwork;

    this.base64 = this.artworkService.selectedArtwork.artworkImage;

    this.updateArtworkForm = this.formBuilder.group({
      artworkID: [this.artworkService.selectedArtwork.artworkID],
      artworkTitle: [this.artworkService.selectedArtwork.artworkTitle],
      artworkPrice: [this.artworkService.selectedArtwork.artworkPrice],
      artworkImage: [this.artworkService.selectedArtwork.artworkImage],
      surfaceTypeID: [this.artworkService.selectedArtwork.surfaceType.surfaceTypeID],
      mediumTypeID: [this.artworkService.selectedArtwork.mediumType.mediumTypeID],
      artworkStatusID: [1],
      frameColourID: [1],
      artworkDimensionID: [this.artworkService.selectedArtwork.artworkDimension.artworkDimensionID],
      artworkTypeID: [1],
    });
  }

  // onEditArtwork(selectedArtwork: Artwork){
  //   this.artworkService.selectedArtwork = selectedArtwork;
  // }

  // confirmArtwork(addArtworkModal){
  //   // this.route.navigate(['/home/art-classes']);
  //   this.modalService.dismissAll(addArtworkModal);
  //   this.toastr.success('Artwork Added Successfully', 'Success')
  //   this.toastr.success('Artwork Successfully Deleted', 'Success')

  // }

  onDeleteArtwork(deleteArtworkModal) {
    this.modalService.open(deleteArtworkModal, { centered: true });
  }

  confirmDeleteArtwork(id: number){
    this.artworkService.deleteArtwork(id).subscribe(res => {
      this.artworkService.getArtworks();
      this.modalService.dismissAll();
      this.toastr.success('Artwork Successfully Deleted', 'Success')
      // this.toastr.info('Could Not Delete Artwork', 'Info')
    })
  }

  // confirmDeleteArtwork(deleteArtworkModal){
  //   // this.route.navigate(['/exhibitions']);


  // }



}
