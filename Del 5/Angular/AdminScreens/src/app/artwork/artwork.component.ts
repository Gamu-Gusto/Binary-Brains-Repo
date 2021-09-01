import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Artwork } from '../model/Artworks/artwork';
import { ArtworkDimension } from '../model/Artworks/artwork-dimension';
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
  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService, public artworkService: ArtworkService) { }

  ngOnInit(): void {
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
      artworkPicture: '',
  
      surfaceType: '',
  
      mediumType: '',
  
      artworkStatus: '',
  
      frameColour: '',
  
      artworkDimension: ''
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

  addArtwork(addArtworkModal) {
    this.modalService.open(addArtworkModal, { centered: true });
  }

  onSubmit(form: NgForm){
    this.artworkService.postArtwork().subscribe(res =>{
      this.refreshForm(form);
      this.artworkService.getArtworks();
    })
  }

  refreshForm(form: NgForm) {
    form.form.reset();
    this.artworkService.artworkData = new Artwork();
    this.modalService.dismissAll();
    this.toastr.success('Teacher Successfully Added', 'Success')
  }

  onEdit(updateArtworkModal){
    this.modalService.open(updateArtworkModal, { centered: true });
  }

  onEditArtwork(selectedArtwork: Artwork){
    this.artworkService.selectedArtwork = selectedArtwork;
  }

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


  onConfirm(confirmModal) {
    this.modalService.open(confirmModal, { centered: true });

  }

  onYes(confirmModal){
    // this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll(confirmModal);
    this.toastr.success('Artwork Successfully Updated', 'Success')
    this.toastr.info('Could Not Update Artwork', 'Error')
  }


}
