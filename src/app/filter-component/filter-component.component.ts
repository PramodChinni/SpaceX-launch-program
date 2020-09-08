import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ButtonModel, FilterReqModel } from './filter-component.model';
import { AppConstants } from '../app-constants';
@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css']
})
export class FilterComponentComponent implements OnInit {
  isClicked:boolean;
  yearButtons: ButtonModel[];
  launchButtons: ButtonModel[];
  landingButtons: ButtonModel[];
  filterReqObj: FilterReqModel;
   
  @Output() filterObject = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.isClicked =false;
    this.filterReqObj =  new FilterReqModel();      
    this.loadFilters();
  }

  loadFilters(){
    let cachedData = JSON.parse(window.localStorage.getItem('filterCached')) as FilterReqModel;
    if(cachedData && cachedData.yearIndex)
       AppConstants.yearsButtons[cachedData.yearIndex].isSelected = true;       
    if(cachedData && cachedData.launchIndex  >=0 )
       AppConstants.launchButtons[cachedData.launchIndex].isSelected = true;
    if(cachedData && cachedData.landingIndex >= 0)
       AppConstants.landingButtons[cachedData.landingIndex].isSelected = true;
    this.yearButtons = AppConstants.yearsButtons;
    this.launchButtons = AppConstants.launchButtons;
    this.landingButtons = AppConstants.landingButtons;
  }

  selectedYear(year: ButtonModel, indx:number){
    if(year && year.val){  
      const data = {...year}; 
      this.yearButtons.map(year=>{year.isSelected = false;});
      if(!data.isSelected){     
        let filterReqObj = JSON.parse(window.localStorage.getItem('filterCached'));      
        delete filterReqObj.launch_year;
        delete filterReqObj.yearIndex;
        window.localStorage.setItem('filterCached', JSON.stringify(filterReqObj));
      }else{
        this.yearButtons[indx].isSelected = data.isSelected;
        this.filterReqObj.launch_year = year.val;     
        this.filterReqObj.yearIndex = indx;
      }   
      this.filterObject.emit(this.filterReqObj);              
    }   
  }

  selectedLaunch(lnch: ButtonModel, indx:number){
    if(lnch && lnch.val){
      const data = {...lnch};
      this.launchButtons.map(lnch=>{lnch.isSelected = false;});
      if(!data.isSelected){  
        let filterReqObj = JSON.parse(window.localStorage.getItem('filterCached'));     
        delete filterReqObj.launch_success;
        delete filterReqObj.launchIndex;
        window.localStorage.setItem('filterCached', JSON.stringify(filterReqObj));
      }else{
        this.launchButtons[indx].isSelected = data.isSelected;
        this.filterReqObj.launch_success = (lnch.val == 'True') ? true : false;
        this.filterReqObj.launchIndex = indx;
      }        
      this.filterObject.emit(this.filterReqObj);   
    }    
  }

  selectedLanding(lndng: ButtonModel, indx:number){
    if(lndng && lndng.val){
      const data = {...lndng};
      this.landingButtons.map(lndng=>{lndng.isSelected = false;});    
      if(!data.isSelected){      
        let filterReqObj = JSON.parse(window.localStorage.getItem('filterCached'));     
        delete filterReqObj.land_success;
        delete filterReqObj.landingIndex;
        window.localStorage.setItem('filterCached', JSON.stringify(filterReqObj));
      }else{
        this.landingButtons[indx].isSelected = data.isSelected;
        this.filterReqObj.land_success = (lndng.val == 'True') ? true : false;
        this.filterReqObj.landingIndex = indx;
      }   
      this.filterObject.emit(this.filterReqObj);       
    }    
  }

}
