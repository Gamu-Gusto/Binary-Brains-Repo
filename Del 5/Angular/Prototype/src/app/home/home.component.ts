import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public hide: boolean = false;

  public showhome: boolean = false;
  title = 'Prototype';
  name = 'Angular';
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private route: Router,
    private toastr: ToastrService
  ) {
    // sets an idle timeout of 30 seconds, for testing purposes.
    idle.setIdle(600);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => (this.idleState = 'No longer idle.'));
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.route.navigate(['/login']);
      window.localStorage.clear();
    });
    idle.onIdleStart.subscribe(() => (this.idleState = "You've gone idle!"));

    idle.onTimeoutWarning.subscribe(
      (countdown) =>
        //this.idleState =

        this.toastr.error(
          "You've gone idle! for too long",
          'You will be logged out in ' + countdown + ' seconds!'
        )

      //this.simpleAlert(countdown)
    );

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  ngOnInit(): void {
    this.showhome = true;
    this.hide = false;
  }

  simpleAlert(countdown) {
    Swal.fire(
      'You will be logged out in ' +
        countdown +
        ' seconds. Click Ok to continue using!'
    );
  }

  successAlertNotification() {
    Swal.fire('Hi', 'Congrats! operation successfull', 'success');
  }

  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your Action cannot be rollback.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think again',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Done!', 'Action performed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Performed action record present in cloud and databstore.)',
          'error'
        );
      }
    });
  }
}
