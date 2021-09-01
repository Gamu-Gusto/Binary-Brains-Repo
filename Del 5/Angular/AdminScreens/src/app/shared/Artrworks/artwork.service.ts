import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artwork } from 'src/app/model/Artworks/artwork';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  artworkData: Artwork = new Artwork();
  artworkList: Artwork[];
  selectedArtwork: Artwork;
  constructor(private http: HttpClient) { }

  getMediumType(){
    return this.http.get(environment.apiUrl + 'MediumType')
  }

  getSurfaceType() {
    return this.http.get(environment.apiUrl + 'SurfaceType')
  }

  getDimensions() {
    return this.http.get(environment.apiUrl + 'Dimensions')
  }

  getArtworks(){
    return this.http.get(environment.apiUrl + 'Artworks').toPromise().then(res =>{
      this.artworkList = res as Artwork[];
    });
  }

  postArtwork(){
    return this.http.post(environment.apiUrl + 'Artwork/', this.artworkData)
  }

  putArtwork() {
    return this.http.put(environment.apiUrl + 'Artwork/' + this.artworkData.artworkID, this.artworkData)
  }

  deleteArtwork(id: number){
    return this.http.delete(environment.apiUrl + 'Artwork/' + id)
  }
}
