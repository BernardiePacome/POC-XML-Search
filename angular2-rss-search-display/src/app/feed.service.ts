import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {  map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { Feed } from './model/feed';
import * as x2js  from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http:HttpClient,
  ) { 
    
  }
  
  public xml2js: any = [];

  private getXMLJson() : Observable<any> {
    const url = environment.api_url;
    return this.http.get(url + '/xml');
  }

  extractFeeds(): Feed {
    
    return this.getXMLJson().subscribe((res)=>{
      const posts = JSON.stringify(res);
      console.log(res);
      x2js.parseString(res, (err,result)=>{
        
        console.log('parsed',posts as Feed);
      })
    })
  }

}
