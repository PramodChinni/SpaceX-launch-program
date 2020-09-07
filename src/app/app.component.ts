import { Component, OnInit } from '@angular/core';
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
  constructor(private apiService: ApiService){}
  ngOnInit(){
    this.programs = [];   
    this.apiService.fetchDataOnLoad().subscribe((data: any[])=>{
      console.log(data);
      this.programs = data;		
		});
  }
}
