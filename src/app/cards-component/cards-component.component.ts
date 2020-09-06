import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-cards-component',
  templateUrl: './cards-component.component.html',
  styleUrls: ['./cards-component.component.css']
})
export class CardsComponentComponent implements OnInit, OnChanges {

  @Input() cardsData:any;
  constructor() { }

  ngOnInit(): void {
    this.cardsData = [];
  }

  ngOnChanges(data:any){
    debugger;
    if(data &&  data.cardsData){
      this.cardsData = data.cardsData.currentValue;
    }
  }

}
