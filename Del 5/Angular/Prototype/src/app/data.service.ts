import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './model/user.model'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { take, takeUntil, map, filter, switchMap } from 'rxjs/operators';
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
  apiURL = 'https://localhost:' + this.port + '/api';

  user: User;
  artclass: ArtClass;
  exhibition: Exhibition;
  artwork: Artwork;
  listUserTypes: UserType[];
  listSuburbs: Suburb[];
  listCities: City[];
  listCountries: Country[];
  listProvinces: Province[];
  sharedData: any;
  teacherData: any;
  venueData: any;
  organisationData: any;
  artClassTypeData: any;
  timestamp: string;
  dateofbirth: string
  monthseperator: string;
  dayseperator: string;
  loginInUserData:any;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  loginUser(user) {

    let params = new HttpParams().set('UserName', user.UserName).set('password', user.Password);

    return this.http
      .get<User>(this.apiURL + '/Login/' + user.UserName + '/' + user.Password)
      .pipe(
        retry(1)
        ,
        catchError(this.handleError)


      );

  }

  getAllUserTypes(): Promise<any> {

    return this.http
      .get(this.apiURL + '/UserType').toPromise()

  };


  getAllSuburbs(): Promise<any> {

    return this.http.get(this.apiURL + '/Surburb').toPromise()

  };

  getAllCities(): Promise<any> {

    return this.http.get(this.apiURL + '/City').toPromise()

  };

  getAllCountries(): Promise<any> {

    return this.http.get(this.apiURL + '/Country').toPromise()

  };


  getAllProvinces(): Promise<any> {
    return this.http.get(this.apiURL + '/Province').toPromise()
  };



  getAllArtwork(): Promise<any> {

    return this.http.get(this.apiURL + '/Artwork').toPromise()

  };

  getAllArtClasses(): Promise<any> {

    return this.http.get(this.apiURL + '/ArtClass').toPromise()

  };

  getAllExhibitions(): Promise<any> {

    return this.http.get(this.apiURL + '/Exhibition').toPromise()

  };


  getArtClass(id): Promise<any> {

    return this.http.get(this.apiURL + '/ArtClass/' + id).toPromise()

  };

  getVenue(id): Promise<any> {

    return this.http.get(this.apiURL + '/Venue/' + id).toPromise()

  };


  getTeacher(id): Promise<any> {

    return this.http.get(this.apiURL + '/ClassTeacher/' + id).toPromise()

  };
  getClassType(id): Promise<any> {

    return this.http.get(this.apiURL + '/ArtClassType/' + id).toPromise()

  };
  getOrganisation(id): Promise<any> {

    return this.http.get(this.apiURL + '/Organisation/' + id).toPromise()

  };



  getAllBookings() {

    return this.http.get(this.apiURL + '/Booking')

  };

  getAllClassTeachers() {

    return this.http.get(this.apiURL + '/ClassTeacher')

  };



  addUser(user): Promise<any> {

    console.table(user);

    this.timestamp = user.timestamp + ".098Z";

    if (user.UserDOB.month > 9) {
      this.monthseperator = "-"

    }
    else {

      this.monthseperator = "-0"
    }

    if (user.UserDOB.day > 9) {
      this.dayseperator = "-"

    }
    else {

      this.dayseperator = "-0"
    }

    this.dateofbirth = user.UserDOB.year + this.monthseperator + user.UserDOB.month + this.dayseperator + user.UserDOB.day + "T00:00:00.000Z";

    user = {
      "userID": 0,
      "userName": user.UserName,
      "userFirstName": user.UserFirstName,
      "userLastName": user.UserLastName,
      "userEmail": user.UserEmail,
      "userPhoneNumber": user.UserPhoneNumber,
      "userPassword": user.UserPassword,
      "userDOB": this.dateofbirth,
      "userAddressLine1": user.UserAddressLine1,
      "userAddressLine2": user.UserAddressLine2,
      "userPostalCode": user.UserPostalCode,
      "artistBio": user.ArtistBio,
      "userTypeID": user.UserTypeId,
      "suburbID": user.SuburbId,
      "timestamp": this.timestamp


    };

    console.table(user);
    return this.http
      .post<User>(this.apiURL + '/User', user, this.httpOptions)
      .toPromise()
  }

  updateUser(user){
    return this.http
    .put<User>(this.apiURL + '/User/'+user.userID, user, this.httpOptions)
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


  addBooking(booking): Promise<any>  {

    console.log(booking);

    return this.http
      .post<Booking>(this.apiURL + '/Booking', booking, this.httpOptions)
      .toPromise()


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
