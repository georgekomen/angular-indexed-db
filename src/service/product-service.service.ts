import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpResponse} from '@angular/common/http';
import {BaseHttpServiceService} from "./base-http-service.service";
import {Product} from "../domain/Product";
import {ConfigServiceService} from "../config/config-service.service";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:BaseHttpServiceService<Product>, private configService: ConfigServiceService) { }

  getListOfProducts(): Observable<any>{
    return this.http.get(`${this.configService.productUrl}/products?size=1000000&page=0`).map((res:HttpResponse<Product>)=>res);
  }
}
