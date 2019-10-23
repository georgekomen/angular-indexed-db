import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {HttpResponse} from '@angular/common/http';
import {BaseHttpServiceService} from "./base-http-service.service";
import {ConfigServiceService} from "../config/config-service.service";

@Injectable({
  providedIn: 'root'
})
export class ClaimServiceService {
  constructor(private http:BaseHttpServiceService<any>, private configService: ConfigServiceService) { }

  getTreatments(): Observable<any>{
    return this.http.get(`${this.configService.claimUrl}/treatments?size=1000000&page=0`).map((res:HttpResponse<any>)=>res);
  }

}
