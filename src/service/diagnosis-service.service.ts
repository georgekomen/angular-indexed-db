import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpResponse} from '@angular/common/http';
import {BaseHttpServiceService} from "./base-http-service.service";
import {DiagnosisSearchResults} from "../domain/diagnosisSearchResults";
import {ConfigServiceService} from "../config/config-service.service";

@Injectable({
  providedIn: 'root'
})
export class DiagnosisServiceService {

  constructor(private http:BaseHttpServiceService<DiagnosisSearchResults>, private configService: ConfigServiceService) { }

  getListOfDiagnosis(): Observable<any> {
    return this.http.get(`${this.configService.productUrl}/diagnosis?size=1000000&page=0`).map((res:HttpResponse<DiagnosisSearchResults>)=>res);
  }
}
