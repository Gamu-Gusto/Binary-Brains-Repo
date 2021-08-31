import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders ,HttpParams  } from '@angular/common/http';
import{User} from './model/user.model'
import { Observable ,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';    
import { take, takeUntil ,map,filter,switchMap} from 'rxjs/operators';
import { UserType } from './model/Users/user-type';
import { Suburb } from './model/Users/suburb';
import { City } from './model/Users/city';
import { Country } from './model/Users/country';
import { Province } from './model/Users/province';
import { ArtClass } from './model/ArtClasses/art-class';
import { Exhibition } from './model/Exhibitions/exhibition';
import { Artwork } from './model/Artworks/artwork';
import { Booking } from './model/Bookings/booking';
import { ClassTeacher } from './model/ArtClasses/class-teacher';
import { Payment } from './model/Payments/payment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

//https://localhost:44353/api/Login
  port = 44353;
  apiURL = 'https://localhost:'+this.port+'/api';

  user : User;
  artclass : ArtClass;
  exhibition: Exhibition;
  artwork: Artwork;
  listUserTypes: UserType[];
  listSuburbs: Suburb[];
  listCities: City[];
  listCountries: Country[];
  listProvinces: Province[];

  constructor(private http: HttpClient,private toastr: ToastrService) { }

   // Http Options
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  loginUser(user){

    let params = new HttpParams().set('UserName', user.UserName).set('password',user.Password);

    return this.http
    .get<User>(this.apiURL + '/Login/'+user.UserName+'/'+user.Password)
    .pipe(
      retry(1)
      ,
      catchError(this.handleError)
  
  
    );

  }

  getAllUserTypes(){
 
    return this.http
    .get(this.apiURL + '/UserType')

  };


  getAllSuburbs(): Observable<Suburb[]>{

    return this.http.get(this.apiURL + '/Surburb') 
    .pipe(map((response: any) => response.json()))
    .pipe(catchError(this.handleError))


  };

  getAllCities(): Promise<any> {

    return this.http.get(this.apiURL + '/City').toPromise()

  };

  getAllCountries(){

    return this.http.get(this.apiURL + '/Country')

  };


  getAllProvinces(){
  return this.http.get(this.apiURL + '/Province') 
};


  
  getAllArtwork(){

    return this.http.get(this.apiURL + '/Artwork') 

  };

  getAllArtClasses(){

    return this.http.get(this.apiURL + '/ArtClass') 

  };

  getAllBookings(){

    return this.http.get(this.apiURL + '/Booking') 

  };

  getAllClassTeachers(){

    return this.http.get(this.apiURL + '/ClassTeacher') 

  };


  
 addUser(user): Promise<any> {
user ={
  "userID": 0,
  "userName": "string",
  "userFirstName": "string",
  "userLastName": "string",
  "userEmail": "string",
  "userPhoneNumber": 0,
  "userPassword": "string",
  "userDOB": "2021-08-30T20:19:17.379Z",
  "userAddressLine1": "string",
  "userAddressLine2": "string",
  "userPostalCode": 0,
  "artistBio": "string",
  "userTypeID": 0,
  "userType": {
    "userTypeID": 0,
    "userRoleName": "string",
    "privilegesID": 0,
    "privileges": {
      "privilegesID": 0,
      "privilegeName": "string",
      "privilegeDescription": "string"
    }
  },
  "suburbID": 0,
  "suburb": {
    "suburbID": 0,
    "suburbName": "string",
    "cityID": 0,
    "city": {
      "cityID": 0,
      "cityName": "string",
      "provinceID": 0,
      "province": {
        "provinceID": 0,
        "provinceName": "string",
        "countryID": 0,
        "country": {
          "countryID": 0,
          "countryName": "string"
        }
      }
    }
  }
};
  console.table(user);
  return this.http
  .post<User>(this.apiURL + '/User', user, this.httpOptions)
  .toPromise()
}  

  
addArtClass(artclass): Observable<ArtClass> {

  console.log(artclass);

  return this.http
  .post<ArtClass>(this.apiURL + '/ArtClass', artclass)
  .pipe(
    retry(1)
    ,
    catchError(this.handleError)
    
  )

  

}  

  
addExhibition(exhibition): Observable<Exhibition> {

  console.log(exhibition);

  return this.http
  .post<Exhibition>(this.apiURL + '/Exhibition', JSON.stringify(exhibition), this.httpOptions)
  .pipe(
    retry(1)
    ,
    catchError(this.handleError)
    
  )

  

} 

  
addBooking(booking): Observable<Booking> {

  console.log(booking);

  return this.http
  .post<Booking>(this.apiURL + '/Booking', JSON.stringify(booking), this.httpOptions)
  .pipe(
    retry(1)
    ,
    catchError(this.handleError)
    
  )

  

} 

  
addPayment(payment): Observable<Payment> {

  console.log(payment);

  return this.http
  .post<Payment>(this.apiURL + '/Booking', JSON.stringify(payment), this.httpOptions)
  .pipe(
    retry(1)
    ,
    catchError(this.handleError)
    
  )

  

} 

addClassTeacher(classteacher): Observable<ClassTeacher> {

  console.log(classteacher);

  return this.http
  .post<ClassTeacher>(this.apiURL + '/ClassTeacher', JSON.stringify(classteacher), this.httpOptions)
  .pipe(
    retry(1)
    ,
    catchError(this.handleError)
    
  )

  

} 

  
addArtwork(artwork): Observable<Artwork> {

  console.log(artwork);

  return this.http
  .post<Artwork>(this.apiURL + '/Artwork', JSON.stringify(artwork), this.httpOptions)
  .pipe(
    retry(1)
    ,
    catchError(this.handleError)
    
  )

  

}
        // Error handling 
handleError(error) {
    
  let errorMessage = '';

    // Get client-side error
    errorMessage = error.error;
  

console.log(errorMessage);

 // this.toastr.error(errorMessage, 'Error',{ disableTimeOut:true});
  
  return throwError(errorMessage);
}

}
