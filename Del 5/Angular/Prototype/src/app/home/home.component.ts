import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public hide:boolean = false;

  public showhome:boolean = false;
  constructor() { }

  ngOnInit(): void {

    this.showhome = true;
    this.hide = false;
  }

}
