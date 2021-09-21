import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Announcement } from '../model/Users/announcement';
import { AnnouncementService } from '../shared/Announcement/announcement.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  constructor(public announcementService: AnnouncementService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.announcementService.postAnnouncement().subscribe(res =>{
      this.refreshForm(form);    
    });
  }

  refreshForm(form: NgForm) {
    form.form.reset();
    this.announcementService.announcementData = new Announcement();
    this.modalService.dismissAll();
    this.toastr.success('Announcement Successfully Posted', 'Success')
  }

}
