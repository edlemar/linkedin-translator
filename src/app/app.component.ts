import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    this.activeLink = "app-root";
  }

  activeLink = "";
  links = ["home", "app", "translate"];
  background = "#1A8CD8";

}
