import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-exhibition-report',
  templateUrl: './exhibition-report.component.html',
  styleUrls: ['./exhibition-report.component.scss']
})
export class ExhibitionReportComponent implements OnInit {
  exhibitions;
  exhibition;

  constructor(private httpService: HttpClient) { }

  ngOnInit(): void {
    this.httpService.get('https://localhost:44312/api/Exhibitions').subscribe (res => {
      this.exhibitions = res as string [];
      console.log(this.exhibitions = res as string [])
    });
  }

  getExhibition(ExhibitionID){
    this.httpService.get('https://localhost:44312/api/Exhibition/getExhibition/' + ExhibitionID).subscribe (res => {
      this.exhibition = res as string [];
      console.log(this.exhibition = res as string [])
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
        
        PDF.save('Exhibition_Report.pdf');
    });     
    }

}
