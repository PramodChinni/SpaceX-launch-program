import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css']
})
export class FilterComponentComponent implements OnInit {

  isClicked:boolean;
  constructor() { }

  ngOnInit(): void {
    this.isClicked =false;
  }

}
