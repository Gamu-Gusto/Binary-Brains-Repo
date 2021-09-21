import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  removeArtist(removeArtistModal) {
    this.modalService.open(removeArtistModal, { centered: true });

  }

  confirmRemove(removeArtistModal){
    this.route.navigate(['/tags']);
    this.modalService.dismissAll(removeArtistModal);
    this.toastr.success('Artist Successfully removed from Exhibition', 'Success')
    this.toastr.info('Could not remove Artist from Exhibition', 'Info')

  }

}