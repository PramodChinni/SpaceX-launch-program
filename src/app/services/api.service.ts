import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "https://api.spaceXdata.com/v3/launches?limit=100";
  constructor(private httpClient: HttpClient) { }

  public fetchDataOnLoad(): Observable<any>{  
		return this.httpClient.get(`${this.SERVER_URL}/products`);  
	} 
}
