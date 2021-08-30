import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { UserType } from '../model/Users/user-type';
import { Suburb } from '../model/Users/suburb';
import { Province } from '../model/Users/province';
import { Country } from '../model/Users/country';
import { City } from '../model/Users/city';
import {NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


//**Interfaces */
/*
interface UserType {
  id: string;
  name: string;
}

interface Surburb {
  id: string;
  name: string;
}

/**End Interfaces */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public listUserTypes: any;

  public listSurburbs:any;

  public listProvinces: any;

  public listCountries: any;

  public listCities: any;

  public User : FormControl = new FormControl(); 
  registrationForm: FormGroup;

  formSubmitted = false;
  theErrors: string[] = [];



  /*

  error_messages = {
    'UserName': [
      { type: 'required', message: 'User Name is required.' },
    ],

    'UserFirstName': [
      { type: 'required', message: 'First Name is required.' }
    ],

    'UserLastName': [
      { type: 'required', message: 'Last Name is required.' }
    ],

    'UserEmail': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length.' },
      { type: 'maxlength', message: 'Email length.' },
      { type: 'required', message: 'please enter a valid email address.' }
    ],

    'UserPassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'UserPasswordConfirm': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  }
  */
  errorMessage: any;

  constructor(public data: DataService,private route: Router, private modalService: NgbModal, private toastr: ToastrService,private formBuilder: FormBuilder,private fb: FormBuilder) { 
    
    
    this.registrationForm = new FormGroup({
    
      UserName : new FormControl(''),
      UserFirstName : new FormControl(''),
      UserLastName : new FormControl(''),
      UserEmail : new FormControl(''),
      UserPhoneNumber : new FormControl(''),
      UserPassword : new FormControl(''),
      UserPasswordConfirm : new FormControl(''),
      UserDOB : new FormControl(''),
      UserAddressLine1 : new FormControl(''),
      UserAddressLine2 : new FormControl(''),
      UserPostalCode : new FormControl(''),
      ArtistBio : new FormControl(''),
      UserTypeId: new FormControl(''),
      SurburbId: new FormControl(''),
      CountryId: new FormControl(''),
      ProvinceId: new FormControl(''),
      CityId: new FormControl(''),
   
   
  
     });





  }

  ngOnInit(): void {

  this.getuserTypes();
  this.getCities();
  this.getCountries();
  this.getPrivinces();
  this.getSuburbs();
   
  console.log(this.listUserTypes);

    this.registrationForm =  this.formBuilder.group({
  
    UserName :  [''],
    UserFirstName : [''],
    UserLastName : [''],
    UserEmail : [''],
    UserPhoneNumber : [''],
    UserPassword: [''],
    UserPasswordConfirm: [''],
    UserDOB : [''],
    UserAddressLine1 : [''],
    UserAddressLine2 : [''],
    UserPostalCode :[''],
    ArtistBio : [''],
    UserTypeId: [''],
    SurburbId: [''],
    CityId: [''],
    ProvinceId: [''],
    CountryId: [''],
  });

  }

  UserPassword(formGroup: FormGroup) {
    const { value: UserPassword } = formGroup.get('UserPassword');
    const { value: UserPasswordConfirm } = formGroup.get('UserPasswordConfirm');
    return UserPassword === UserPasswordConfirm ? null : { passwordNotMatch: true };
  }
    
  getuserTypes() {  
    this.data.getAllUserTypes().subscribe(response => {
      
      this.listUserTypes = response
    
    }, err => 
    {console.log("Error",err)
  });  

    console.log(this.listUserTypes);
} 

getCities() {  
  this.data.getAllCities().subscribe(response => {
      
    this.listCities = response
  
  }, err => 
  {console.log("Error",err)
}); 
} 
getSuburbs() {  
  this.data.getAllSuburbs().subscribe(response => {
      
    this.listSurburbs = response
  
  }, err => 
  {console.log("Error",err)
}); 
} 
getCountries() {  
  this.data.getAllCountries().subscribe(response => {
      
    this.listCountries = response
  
  }, err => 
  {console.log("Error",err)
}); 
} 
getPrivinces() {  
  this.data.getAllProvinces().subscribe(response => {
      
    this.listProvinces = response
  
  }, err => 
  {console.log("Error",err)
}); 
} 

  onSubmit(event) { 
   
    this.formSubmitted = true;
    event.preventDefault();
                  
    if (this.registrationForm.invalid) {
       return;
    }

    else{
          
     console.log(this.registrationForm.value);
                      
      this.data.addUser(this.registrationForm.value).subscribe(success => 
                          
        {
          this.route.navigate(['/login']);
          this.toastr.success("Registration Successful, Please Login", 'Success',{
            disableTimeOut:true,
            tapToDismiss: false,
            closeButton: true,
            positionClass:'toast-top-full-width',
            
            
        
          });

          
          this.formSubmitted = false;
            this.registrationForm.reset();
        
          
                        
        }, error =>{
          
          console.log(error);
      
        this.toastr.error(error, 'Error',{
        disableTimeOut:true,
        tapToDismiss: false,
        closeButton: true,
        positionClass:'toast-top-full-width',
        enableHtml: true
    
      });

      console.log(error);
    
  });

       

    }
    
  }
  onRegister(modalRegister) {
    this.modalService.open(modalRegister, { centered: true });
  }

  submitRegistration (modalRegister) {
    this.route.navigate(['/login']);
    this.modalService.dismissAll(modalRegister);
    // this.toastr.success('Registration Successful', 'Success');
    this.toastr.error('Registration Unsuccessful', 'Error');
  }

  cancelRegistration(cancelRegisterModal) {
    this.modalService.open(cancelRegisterModal, { centered: true });
  }

  yesCancel (cancelRegisterModal) {
    this.route.navigate(['/login']);
    this.modalService.dismissAll(cancelRegisterModal);
    // this.toastr.success('Registration Successful', 'Success');
    this.toastr.warning('Registration Cancelled', 'Warning');
  }



}
