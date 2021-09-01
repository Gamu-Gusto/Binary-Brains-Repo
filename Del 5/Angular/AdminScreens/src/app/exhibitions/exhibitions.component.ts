import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Exhibition } from '../model/Exhibitions/exhibition';
import { ExhibitionService } from '../shared/Exhibitions/exhibition.service';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.scss']
})
export class ExhibitionsComponent implements OnInit {
  exhibition: Exhibition;
  searchValue: string;
  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService, public exhibitionService: ExhibitionService) { }

  ngOnInit(): void {
    this.resetObject();
    this.exhibitionService.getExhibitions();
  }

resetObject(){
  this.exhibition = {
    exhibitionID: 0,
    exhibitionName: '',
    exhibitionDescription: '',
    exhibitionDate: '',
    exhibitionTime: '',
    exhibition_Image: '',
    exhibitionType: '',
    schedule: '',
    organisation: '',
    exhibitionAnnouncement: '',
    venue: '',
  }
}

onEditExhibition(selectedExhibition: Exhibition){
  this.exhibitionService.selectedExhibition = selectedExhibition;
}

  onDeleteExhibition(deleteExhibitionModal) {
    this.modalService.open(deleteExhibitionModal, { centered: true });
  }

  confirmDeleteExhibition(id: number){
    // this.route.navigate(['/exhibitions']);
    this.exhibitionService.deleteExhibition(id).subscribe(res => {
      this.exhibitionService.getExhibitions();
      this.modalService.dismissAll();
      this.toastr.success('Exhibition Successfully Deleted', 'Success')
     // this.toastr.info('Could Not Delete Exhibition', 'Info')
    });

  }

}
