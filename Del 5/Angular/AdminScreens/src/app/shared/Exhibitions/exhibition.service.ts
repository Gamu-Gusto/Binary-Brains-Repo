import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exhibition } from 'src/app/model/Exhibitions/exhibition';
import { ExhibitionAnnouncement } from 'src/app/model/Exhibitions/exhibition-announcement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionService {
  announcementData : ExhibitionAnnouncement = new ExhibitionAnnouncement();
  exhibitionData: Exhibition = new Exhibition();
  exhibitionList:  Exhibition[];
  selectedExhibition: Exhibition;

  constructor(private http: HttpClient) { }

  getExhibitionType(){
    return this.http.get(environment.apiUrl + 'ExhibitionType')
  }

  getVenue(){
    return this.http.get(environment.apiUrl + 'Venue')
  }

  getExhibitions(){
    return this.http.get(environment.apiUrl + 'Exhibition').toPromise().then(res => {
      this.exhibitionList = res as Exhibition[];
    });
  }

  postAnnouncement(){
    return this.http.post(environment.apiUrl + 'ExhibitionAnnouncement/', this.announcementData)
  }

  postExhibition(){
    return this.http.post(environment.apiUrl + 'Exhibition/', this.exhibitionData)
  }

  putExhibition(){
    return this.http.put(environment.apiUrl + 'Exhibition/' + this.exhibitionData.exhibitionID, this.exhibitionData)
  }

  deleteExhibition(id: number){
    return this.http.delete(environment.apiUrl + 'Exhibition/' + id)
  }
}
