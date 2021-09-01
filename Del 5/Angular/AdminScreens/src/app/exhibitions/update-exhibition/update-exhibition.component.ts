import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Exhibition } from 'src/app/model/Exhibitions/exhibition';
import { ExhibitionType } from 'src/app/model/Exhibitions/exhibition-type';
import { Venue } from 'src/app/model/Exhibitions/venue';
import { ExhibitionService } from 'src/app/shared/Exhibitions/exhibition.service';

@Component({
  selector: 'app-update-exhibition',
  templateUrl: './update-exhibition.component.html',
  styleUrls: ['./update-exhibition.component.scss']
})
export class UpdateExhibitionComponent implements OnInit {
  exhibitionTypeList: ExhibitionType[];
  venueList: Venue[];
  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService, public exhibitionService: ExhibitionService) { }

  ngOnInit(): void {
    this.getExhibitionType();
    this.getVenue();
  }

  getExhibitionType(){
    this.exhibitionService.getExhibitionType().subscribe( res => {
      this.exhibitionTypeList =  res as ExhibitionType[];
    })
  }

  getVenue(){
    this.exhibitionService.getVenue().subscribe(res => {
      this.venueList =  res as Venue[];
    });
  }

onSubmit(form: NgForm){
  this.exhibitionService.putExhibition().subscribe( res => {
    this.exhibitionService.getExhibitions();
    this.refreshForm(form);
    this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll();
    this.toastr.success('Exhibition updated Successfully', 'Success')
    // this.toastr.info('Could not Update Exhibition', 'Info')
  })
}  

refreshForm(form: NgForm){
  form.form.reset();
  this.exhibitionService.exhibitionData = new Exhibition();
}


  addAnnouncement(announcementModal) {
    this.modalService.open(announcementModal, { centered: true });

  }

  confirmAnnouncement(announcementModal){
    this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll(announcementModal);
    this.toastr.success('Exhibition updated Successfully', 'Success')
    this.toastr.info('Could not Update Exhibition', 'Info')

  }

  onCancel(cancelModal) {
    this.modalService.open(cancelModal, { centered: true });

  }

  confirmCancel(cancelModal){
    this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll(cancelModal);
    // this.toastr.success('Exhibition created Successfully', 'Success')
  }

}
