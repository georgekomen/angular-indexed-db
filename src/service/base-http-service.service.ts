import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpServiceService<T extends any>{

  httpOptions:any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer env'
      })
    };
  }

  get(url:string):Observable<any>{
    return this.http.get<T>(`${url}`,this.httpOptions);
  }


}
