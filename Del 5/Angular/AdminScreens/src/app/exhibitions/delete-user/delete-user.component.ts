import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  removeArtist(removeArtistModal) {
    this.modalService.open(removeArtistModal, { centered: true });

  }

  confirmRemove(removeArtistModal){
    this.route.navigate(['/delete-user']);
    this.modalService.dismissAll(removeArtistModal);
    this.toastr.success('Artist Successfully removed from Exhibition', 'Success')
    this.toastr.info('Could not remove Artist from Exhibition', 'Info')

  }

  removeSelectedArtists(removeAllArtistModal){
    this.modalService.open(removeAllArtistModal, { centered: true });
  }

  confirmRemoveAll(removeAllArtistModal){
    this.route.navigate(['/delete-user']);
    this.modalService.dismissAll(removeAllArtistModal);
    this.toastr.success('All Selected Artists Successfully removed from Exhibition', 'Success')
    this.toastr.info('Could not remove Selected Artists from Exhibition', 'Info')
  }

}
