import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReportService } from 'src/app/shared/report.service';

@Component({
  selector: 'app-new-user-report',
  templateUrl: './new-user-report.component.html',
  styleUrls: ['./new-user-report.component.scss']
})
export class NewUserReportComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private report:ReportService) { }
  model : any={};
  user:any;

  ngOnInit(): void {
    this.showdata(); 

  }
;
  showdata(){
    this.report.showdata().subscribe((res: any) => {
      this.user = res;
      console.log(this.user)
    })
  }
  searchdata(){
    this.report.searchdata(this.model).subscribe((res : any) => {
      this.user = res;
      console.log(this.user)
    })
  }

}


