import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-art-class-report',
  templateUrl: './art-class-report.component.html',
  styleUrls: ['./art-class-report.component.scss']
})
export class ArtClassReportComponent implements OnInit {
  classes;
  class;

  constructor(private httpService: HttpClient) { }

  ngOnInit(): void {
    this.httpService.get('https://localhost:44312/api/ArtClasses').subscribe (res => {
      this.classes = res as string [];
      console.log(this.classes = res as string [])
    });
  }

  getClass(ArtClassID){
    this.httpService.get('https://localhost:44312/api/ArtClasses/getArtClasses/' + ArtClassID).subscribe (res => {
      this.class = res as string [];
      console.log(this.class = res as string [])
    });
  }

  isShown: boolean = false ;
  showTable() {

    this.isShown = true;
    
    }
  
  hideTable(){
    this.isShown = false;
  }

  public download():void {
    let DATA = document.getElementById('pdf');
        
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('Art_Class_Report.pdf');
    });     
    }


}

