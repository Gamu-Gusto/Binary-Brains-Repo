import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-surfaces',
  templateUrl: './surfaces.component.html',
  styleUrls: ['./surfaces.component.scss']
})
export class SurfacesComponent implements OnInit {

  constructor(private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addSurface(addSurfaceModal) {
    this.modalService.open(addSurfaceModal, { centered: true });

  }

  confirmSurface(addSurfaceModal){
    this.modalService.dismissAll(addSurfaceModal);
    this.toastr.success('Surface Successfully Added', 'Success')
    this.toastr.info('Could Not Add New Surface Type', 'Info')
  }

  onDeleteSurface(deleteSurfaceModal) {
    this.modalService.open(deleteSurfaceModal, { centered: true });

  }

  confirmDeleteSurface(deleteSurfaceModal){
    // this.route.navigate(['/exhibitions']);
    this.modalService.dismissAll(deleteSurfaceModal);
    this.toastr.success('Surface Successfully Deleted', 'Success')
    this.toastr.info('Could Not Delete Surface', 'Info')
  }


}