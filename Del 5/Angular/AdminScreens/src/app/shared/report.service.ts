import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  Url: string;

  constructor(private http: HttpClient) { }

  searchdata(model : any){

    return this.http.post<any>('https://localhost:44312/Api/Users/search', model);
  }
  showdata(){
   
    return this.http.get<any>('http://localhost:44312/Api/Users/showdata');  
  }

  // getDateData1(date: Reporting): Observable<Reporting> {  
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  //   return this.http.post<Reporting>('http://localhost:44312/Api/Users/getData/',  
  //   date, httpOptions);  
  // } 


  GetArtTypes(){
    return this.http.get('http://localhost:44312/Api/Feedback/GetArtTypes')
  }

  // GetReportData(data){
  //   console.log(data);
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  //   return this.http.post('https://localhost:44312/Api/Feedback/GetReportData', data, httpOptions)
  // }




  //Jaques
  getReportingData(selection)
  {
    return this.http.get('https://localhost:44312/api/Feedback/getReportData?difficulty='+selection)
    .pipe(map(result => result))
  }
}