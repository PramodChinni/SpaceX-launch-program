import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ButtonModel, FilterReqModel, CacheIndexModel } from './filter-component.model';
import { AppConstants } from '../app-constants';
@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css']
})
export class FilterComponentComponent implements OnInit {

  isClicked:boolean;
  yearsButton: ButtonModel[];
  launchButton: ButtonModel[];
  landingButton: ButtonModel[];
  filterReqObj: FilterReqModel;
  yearSelected: string;
  launch_success:string;
  land_success:string;
  cacheFilters: CacheIndexModel;
  @Output() filterObject = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.isClicked =false;
    this.filterReqObj =  new FilterReqModel();
    this.cacheFilters = new CacheIndexModel();    
    this.loadFilters();
  }

  loadFilters(){
    let cachedData = JSON.parse(window.localStorage.getItem('filterCached')) as CacheIndexModel;
    if(cachedData && cachedData.yearIndex)
       AppConstants.yearsButtons[cachedData.yearIndex].isSelected = true;       
    if(cachedData && cachedData.launchIndex  >=0 )
       AppConstants.launchButtons[cachedData.launchIndex].isSelected = true;
    if(cachedData && cachedData.landingIndex >= 0)
       AppConstants.landingButtons[cachedData.landingIndex].isSelected = true;
    this.yearsButton = AppConstants.yearsButtons;
    this.launchButton = AppConstants.launchButtons;
    this.landingButton = AppConstants.landingButtons;
  }

  selectedYear(year: ButtonModel, indx:number){
    if(year && year.val){      
      this.yearsButton.map(year=>{
        year.isSelected = false;
      });
      this.filterReqObj.launch_year = year.val;
      year.isSelected = !year.isSelected;
      if(this.yearSelected != year.val){
        this.cacheFilters.yearIndex = indx;
        this.yearSelected = year.val;       
        this.filterObject.emit(this.filterReqObj); 
      }else{
        year.isSelected = false;
        delete this.filterReqObj.launch_year;
        //delete this.cacheFilters.yearIndex;
      }                
    }
    this.setLocalStorage();
  }

  selectedLaunch(lnch: ButtonModel, indx:number){
    if(lnch && lnch.val){
      this.launchButton.map(lnch=>{
        lnch.isSelected = false;
      });
      this.filterReqObj.launch_success = (lnch.val == 'True') ? true : false;
      lnch.isSelected = !lnch.isSelected;   
      if(this.launch_success != lnch.val) {
        this.cacheFilters.launchIndex = indx;
        this.launch_success = lnch.val;       
        this.filterObject.emit(this.filterReqObj);
      }else{
        lnch.isSelected = false;
        delete this.filterReqObj.launch_success;
        //delete this.cacheFilters.launchIndex;
      }           
    }
    this.setLocalStorage();
  }

  selectedLanding(lndng: ButtonModel, indx:number){
    if(lndng && lndng.val){
      this.landingButton.map(lndng=>{
        lndng.isSelected = false;
      });      
      this.filterReqObj.land_success = (lndng.val == 'True') ? true : false;
      lndng.isSelected = !lndng.isSelected;
      if(this.land_success != lndng.val) {
        this.cacheFilters.landingIndex = indx;
        this.land_success = lndng.val;
        this.filterObject.emit(this.filterReqObj);
      }else{
        lndng.isSelected = false;
        delete this.filterReqObj.land_success;
        //delete this.cacheFilters.landingIndex;
      }          
    }
    this.setLocalStorage();
  }

  setLocalStorage(){
    if(this.cacheFilters)
    window.localStorage.setItem('filterCached', JSON.stringify({...this.cacheFilters}));
  }

}
