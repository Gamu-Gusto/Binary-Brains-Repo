import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediumType } from 'src/app/model/Artworks/medium-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediumTypeService {

  mediumData: MediumType = new MediumType();
  mediumList: MediumType[];
  constructor(private http: HttpClient) { }

  getMediums(){
    return this.http.get(environment.apiUrl + 'MediumType').toPromise().then(res =>{
      this.mediumList = res as MediumType[];
    })
  }

  postMedium(){
    return this.http.post(environment.apiUrl + 'MediumType/', this.mediumData)
  }

  deleteMedium(id: number){
    return this.http.delete(environment.apiUrl + 'MediumType/' + id)
  }
}
