import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SurfaceType } from '../model/Artworks/surface-type';
import { SurfaceTypeService } from '../shared/Artrworks/surface-type.service';

@Component({
  selector: 'app-surfaces',
  templateUrl: './surfaces.component.html',
  styleUrls: ['./surfaces.component.scss']
})
export class SurfacesComponent implements OnInit {
surface : SurfaceType;
  constructor(private modalService: NgbModal, private toastr: ToastrService, public surfaceService: SurfaceTypeService) { }

  ngOnInit(): void {
    this.resetObject();
    this.surfaceService.getSurfaces();
  }


  resetObject() {
    this.surface = {
      surfaceTypeID : 0,
      surfaceTypeName : ''
    }
  }

  addSurface(addSurfaceModal) {
    this.modalService.open(addSurfaceModal, { centered: true });
  }

  onSubmit(form: NgForm){
    this.surfaceService.postSurface().subscribe(res => {
      this.refreshFrom(form);
      this.surfaceService.getSurfaces();
    })
  }

  refreshFrom(form: NgForm) {
    form.form.reset();
    this.surfaceService.surfaceData = new SurfaceType();
    this.modalService.dismissAll();
    this.toastr.success('Surface Successfully Added', 'Success')
  }

  onDeleteSurface(deleteSurfaceModal) {
    this.modalService.open(deleteSurfaceModal, { centered: true });

  }

  confirmDeleteSurface(id: number){
    // this.route.navigate(['/exhibitions']);
    this.surfaceService.deleteSurface(id).subscribe( res =>{
      this.surfaceService.getSurfaces();
      this.modalService.dismissAll();
      this.toastr.success('Medium Successfully Deleted', 'Success')
      // this.toastr.info('Could Not Delete Medium', 'Info')
    })
  }


}