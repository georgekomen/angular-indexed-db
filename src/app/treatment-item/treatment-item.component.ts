import {Component, Input, OnInit} from '@angular/core';
import {IndexDbServiceService} from "../../service/index-db-service.service";
import {ConfigServiceService} from "../../config/config-service.service";
import {Invoices, Item, Treatment} from "../../domain/treatment";
import {Product} from "../../domain/Product";

@Component({
  selector: 'app-treatment-item',
  templateUrl: './treatment-item.component.html',
  styleUrls: ['./treatment-item.component.css']
})
export class TreatmentItemComponent implements OnInit {

  @Input() treatment: Treatment;

  results:string[]=[];
  text:string;
  constructor(private indexeddbservice:IndexDbServiceService, private configService: ConfigServiceService){

  }

  ngOnInit() {
  }

  addditem(evt){
    console.log(evt);
    const prod: Product = evt;
    let ite = new Item();
    ite.description = prod.productName;
    ite.quantity = 1;
    ite.unitPrice.amount = prod.price.amount;
    ite.unitPrice.currency = prod.price.currency;
    ite.id = prod.id;
    ite.productRef = prod.id;
    if(this.treatment.invoices.length == 0){
      this.treatment.invoices[0] = new Invoices();
      this.treatment.invoices[0].items[0]=ite;
    } else {
      this.treatment.invoices[0].items.push(ite);
    }
    this.indexeddbservice.update(this.configService.storeName.treatments,this.treatment).then(res => {
      this.text='';
    }, (error) => {
      this.text='';
    });
  }

  delete(id){
    this.treatment.invoices[0].items.splice(this.treatment.invoices[0].items.findIndex(gg=>gg.id==id),1);
    this.indexeddbservice.update(this.configService.storeName.treatments, this.treatment);
  }

  search(evt) {
    setTimeout(()=>{
      const searchTerm = evt.query;
      this.query(this.configService.storeName.pricelistitem,this.configService.indexName.productName,searchTerm).then(res=>{
        // this.results = res;
      });
    },1000);
  }

  query(storeName, index, searchTerm):Promise<any[]>{
    let results:any[]=[];
    return this.indexeddbservice.db.openCursor(storeName,(res:any)=>{
      let cursor:any = res.target.result;
      if(cursor) {
        let resul:string = cursor.value[index];
        // console.log(resul);
        if(resul != null){
          if(resul.indexOf(searchTerm)>=0){
            results.push(cursor.value);
            this.results=results;
          }
        }
        cursor.continue();
      } else {
        console.log('no more entries');
      }
    }).then(ff=>{return results});
  }

}
