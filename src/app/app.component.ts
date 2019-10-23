import {Component, OnInit} from '@angular/core';
import {ClaimServiceService} from "../service/claim-service.service";
import {IndexDbServiceService} from "../service/index-db-service.service";
import {SlicePipe} from "@angular/common";
import {CheckServerUpdatesService} from "../service/check-server-updates.service";
import {DiagnosisServiceService} from "../service/diagnosis-service.service";
import {ProductServiceService} from "../service/product-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  results:string[]=[];
  text:string='csc';
  constructor(private diagnosisService: DiagnosisServiceService, private productService: ProductServiceService, private indexeddbservice:IndexDbServiceService, private checkserverupdate:CheckServerUpdatesService){

  }

  ngOnInit(){
    this.checkserverupdate.check();
  }

  download(){
    this.pulldiagnosis();
    this.pullpricelistitem();
  }

  pulldiagnosis(){
    this.diagnosisService.getListOfDiagnosis().subscribe(res=>{
      res.some(diag=>{
        // console.log(diag);
        this.indexeddbservice.add('diagnosis',diag);
      });
    });
  }

  pullpricelistitem() {
    this.productService.getListOfProducts().subscribe(res=>{
      res.some(diag=>{
        // console.log(diag);
        this.indexeddbservice.add('pricelistitem',diag);
      });
    });
  }
}
