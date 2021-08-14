import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss']
})
export class ArtworkComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addArtwork(addArtworkModal) {
    this.modalService.open(addArtworkModal, { centered: true });

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

  confirmDeleteArtwork(deleteArtworkModal){
    // this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll(deleteArtworkModal);
    this.toastr.success('Artwork Successfully Deleted', 'Success')
    this.toastr.info('Could Not Delete Artwork', 'Info')

  }


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
