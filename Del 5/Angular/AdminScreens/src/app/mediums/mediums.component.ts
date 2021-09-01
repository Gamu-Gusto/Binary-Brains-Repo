import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MediumType } from '../model/Artworks/medium-type';
import { MediumTypeService } from '../shared/Artrworks/medium-type.service';

@Component({
  selector: 'app-mediums',
  templateUrl: './mediums.component.html',
  styleUrls: ['./mediums.component.scss']
})
export class MediumsComponent implements OnInit {
medium : MediumType;
  constructor(private modalService: NgbModal, private toastr: ToastrService, public mediumService: MediumTypeService) { }

  ngOnInit(): void {
    this.resetObject();
    this.mediumService.getMediums();
  }

  resetObject() {
    this.medium = {
      mediumTypeID : 0,
      mediumTypeName : ''
    }
  }

  addMedium(addMediumModal) {
    this.modalService.open(addMediumModal, { centered: true });

  }

  onSubmit(form: NgForm){
    this.mediumService.postMedium().subscribe(res => {
      this.refreshFrom(form);
      this.mediumService.getMediums();
    })
  }

  refreshFrom(form: NgForm) {
    form.form.reset();
    this.mediumService.mediumData = new MediumType();
    this.modalService.dismissAll();
    this.toastr.success('Medium Successfully Added', 'Success')
  }


  onDeleteMedium(deleteMediumModal) {
    this.modalService.open(deleteMediumModal, { centered: true });

  }

  confirmDeleteMedium(deleteMediumModal, id: number){
    // this.route.navigate(['/exhibitions']);
    this.mediumService.deleteMedium(id).subscribe( res =>{
      this.mediumService.getMediums();
      this.modalService.dismissAll(deleteMediumModal);
      this.toastr.success('Medium Successfully Deleted', 'Success')
      // this.toastr.info('Could Not Delete Medium', 'Info')
    })

  }

}