import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '../app/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'launch-programs';
  programs:any[];
  filterYears: string[];
  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId){}

  ngOnInit(){
    this.programs = [];  
    if(isPlatformBrowser(this.platformId)){
      this.loadData(window.localStorage.getItem('queryParams'));     
    }    
  }

  loadData(data){
    this.apiService.fetchDataOnLoad(data).subscribe((data: any[])=>{ 
      console.log(data);     
      this.programs = data;		
		}); 
  }

  handleFilterRequest(evnt: any){    
    debugger;
    if(evnt){
      this.loadData(this.encodeQueryData(evnt));
      window.localStorage.setItem('queryParams', this.encodeQueryData(evnt));
    }    
  }

  encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
 }
}
