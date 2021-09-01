import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ArtClass } from '../model/ArtClasses/art-class';
import { ArtClassService } from '../shared/ArtClasses/art-class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService, public artClassService: ArtClassService) { }
  artClass: ArtClass;
  searchValue: string;
  ngOnInit(): void {
    this.resetObject();
    this.artClassService.getArtClass();
  }

  resetObject(){
    this.artClass = {
      artClassID: 0,
      artClassName: '',
      artClassDescription: '',
      artClassStartDate: '',
      artClassEndDate: '',
      artClassLimit: '',
      refundDayLimit: '',
      classPrice: '',
  
      artClassType: '',
  
      venue: '',
  
      classTeacher: '',
  
      artClassAnnouncement: '',
  
      organisation: ''
    }
  }

  onEditArtClass(selectedArtClass: ArtClass) {
    this.artClassService.selectedArtClass = selectedArtClass;
  }

  onDeleteClass(deleteClassModal) {
    this.modalService.open(deleteClassModal, { centered: true });

  }

  confirmDeleteClass(id: number){
    // this.route.navigate(['/exhibitions']);
    this.artClassService.deleteArtClass(id).subscribe(res => {
      this.artClassService.getArtClass();
      this.modalService.dismissAll();
      this.toastr.success('Art Class Successfully Deleted', 'Success');
      // this.toastr.info('Could Not Delete Art Class', 'Info')
    });
  }

}
