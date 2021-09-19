import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { Booking } from 'src/app/model/Bookings/booking';
import { ExpiryDateValidator } from 'src/confirmed.validators';
import { CustomValidationsService } from 'src/custom-validations.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  listBookings: [];

  listUserBookings:Booking[];
   timestamp: any;
  booking: Booking;
  formSubmitted = false;
  selectedBooking: any;
  public Payment: FormControl = new FormControl();
  paymentForm: FormGroup;
datestripped: any;
PaymentModal:any;
  error_messages = {
   
    'CardNumber': [
      { type: 'required', message: 'Card number is required.' },
      { type: 'minlength', message: 'Card Number is too short' },
      { type: 'maxlength', message: 'Card Number length.' }
    ],
    'Code': [
      { type: 'required', message: 'CVV is required' },
      { type: 'minlength', message: 'CVV is too short' },
      { type: 'maxlength', message: 'CVV Number length.' }
    ],

    'ExpiryDate': [
      { type: 'required', message: 'Expiry date is required.' },
      { type: 'minlength', message: 'Expiry date is too short' },
      { type: 'maxlength', message: 'Expiry date length.' },
      { type: 'min', message: 'Card has Expired.' }
    ],

    'CardHolderName': [
      { type: 'required', message: 'Card holder name is required.' }
    ],


  }
  
  errorMessage: any;

  constructor(private route: Router, private modalService: NgbModal, private toastr: ToastrService,public data: DataService
    , private formBuilder: FormBuilder, private fb: FormBuilder,public datepipe: DatePipe) { 

      this.paymentForm = new FormGroup({
        PaymentID: new FormControl(''),
        Amount: new FormControl(''),
        PaymentDateTime: new FormControl(''),
        PaymentType: new FormControl(''),
        PaymentStatus: new FormControl(''),
        BookingID: new FormControl(''),
        CardNumber:new FormControl(''),
        Code:new FormControl(''),
        ExpiryDate:new FormControl(''),
        CardHolderName: new FormControl(''),
        });


    }

  ngOnInit(): void {

     this.data.getAllBookings().then((result) => { 
       
      console.log(result);
      this.listBookings = result 
    
      this.listUserBookings  =this.listBookings.filter((bking: Booking) => bking.userID === this.data.loginInUserData.userID);

      console.log(this.listUserBookings );

    });

    this.timestamp = new Date();  

    let paymentmmyy =this.datepipe.transform(this.timestamp, 'dd/MM/yyyy');

    this.datestripped = paymentmmyy.substring(3,5)+paymentmmyy.substring(8,10);

    var minminthyear = this.datestripped;

    console.log(minminthyear);

    this.paymentForm = this.formBuilder.group({
      PaymentID: [''],
      Amount: [''],
      PaymentDateTime: [''],
      PaymentType: [''],
      PaymentStatus: [''],
      BookingID: [''],
      CardNumber:['', [Validators.required,Validators.minLength(16)]],
      Code:['', [Validators.required,Validators.minLength(3),Validators.maxLength(3)]],
      ExpiryDate:['', [Validators.required,Validators.minLength(4),Validators.maxLength(4),CustomValidationsService.min(minminthyear)]],
      CardHolderName: ['', Validators.required],
      });

 

      
  }

  onCancelBooking(cancelBookingModal) {
  
    this.modalService.open(cancelBookingModal, { centered: true });

  }

  confirmCancel(cancelBookingModal){
    // this.route.navigate(['/home/art-classes']);
    this.modalService.dismissAll(cancelBookingModal);
    this.toastr.success('Cancellation Successful', 'Success')
  }

  onRequestRefund(requestRefundModal) {
    this.modalService.open(requestRefundModal, { centered: true });

  }

  makePayment(makePamentModal,selectedbooking) {

    this.selectedBooking = selectedbooking;

    this.PaymentModal = makePamentModal;

    console.log('SelectedBooking', this.selectedBooking);

    this.modalService.open(makePamentModal, { centered: true });

  }
  confirmRefund(requestRefundModal){
  
    this.modalService.dismissAll(requestRefundModal);
    this.toastr.success('Request Successful', 'Success')
  }

  onSubmit(event){

    this.formSubmitted = true;

    event.preventDefault();
    console.log(this.paymentForm.value);

    this.timestamp = new Date();  

    let latest_date_time =this.datepipe.transform(this.timestamp, 'yyyy-MM-ddTHH:mm:ss');

    this.paymentForm.get('BookingID').setValue(this.selectedBooking.bookingID) ;
    this.paymentForm.get('PaymentDateTime').setValue(latest_date_time+'.098Z');
    this.paymentForm.get('PaymentType').setValue('Credit Card') ;
    this.paymentForm.get('Amount').setValue(this.selectedBooking.artClass.classPrice)  ;

    console.log(this.paymentForm.value);

    if (this.paymentForm.invalid) {
      return;
    }
    else {

      console.log(this.paymentForm.value);

    this.data.addPayment(this.paymentForm.value).then(success => {

    
        this.toastr.success("Payment was successful", 'Success', {
         disableTimeOut: true,
          tapToDismiss: false,
          closeButton: true,
          positionClass: 'toast-top-full-width',

        });
        //this.modalService.dismissAll(this.BookingsModal);
        this.route.navigate(['/my-bookings/bookings']),


      this.formSubmitted = false;     


      }).catch(error => {

        console.log(error);
        this.modalService.dismissAll(this.PaymentModal);
        
        this.toastr.error(error.error, 'Error', {
          disableTimeOut: true,
          tapToDismiss: false,
          closeButton: true,
          positionClass: 'toast-top-full-width',
          enableHtml: true

        });
        console.log(error);
      
      });



    }

    // this.route.navigate(['/home/art-classes']);
    
    this.toastr.success('Request Successful', 'Success')
  }

}
