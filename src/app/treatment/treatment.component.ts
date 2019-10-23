import { Component, OnInit } from '@angular/core';
import {IndexDbServiceService} from "../../service/index-db-service.service";
import {ConfigServiceService} from "../../config/config-service.service";
import {Diagnosis, Invoices, Item, Payment, Treatment} from "../../domain/treatment";

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {
  treatment: Treatment;
  treatmentcode;
  treatmentReady: boolean = false;

  constructor(private indexeddbService: IndexDbServiceService, private configService: ConfigServiceService) { }

  ngOnInit() {

  }

  searchOrCreate(){
    this.treatmentReady =false;
    this.indexeddbService.getByKey(this.configService.storeName.treatments,this.treatmentcode).then(res=>{
      if(res==undefined){
        //create treatment
        if(confirm('treatment does not exist, do you want to create a new one?')){
          this.treatment = new Treatment();
          this.treatment.treatmentCode = this.treatmentcode;
          // this.treatment.invoices = new Invoices();
          // this.treatment.invoices[0].items[0]=new Item();
          // this.treatment.treatmentDiagnoses[0]=new Diagnosis();
          // this.treatment.payments[0]=new Payment();
console.log(this.treatment);
          this.indexeddbService.add(this.configService.storeName.treatments,this.treatment).then(res=>{
            console.log('Response........'+res);
            this.treatmentReady = true;
          }).catch(error=>{
            console.log('Error........'+error);
          });
        }
      } else{
        this.treatment = res;
        this.treatmentReady = true;
      }
    }).catch(e=>{
      console.log(e);
    });
  }
}
