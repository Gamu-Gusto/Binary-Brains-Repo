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

@Injectable({
  providedIn: 'root'
})
export class DataService {

//https://localhost:44353/api/Login
  port = 44353;
  apiURL = 'https://localhost:'+this.port+'/api';

  user : User;
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

    return this.http.get(this.apiURL + '/Surburb') .pipe(map((response: any) => response.json()))
    .pipe(catchError(this.handleError))


  };

  getAllCities(){

    return this.http.get(this.apiURL + '/City') 

  };

  getAllCountries(){

    return this.http.get(this.apiURL + '/Country')

  };


  getAllProvinces(){

    return this.http.get(this.apiURL + '/Province') 

  

  };


  
 addUser(user): Observable<User> {

  return this.http
  .post<User>(this.apiURL + '/User', JSON.stringify(user), this.httpOptions)
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
