import { Injectable } from '@angular/core';
import {IndexedDBAngular} from "indexeddb-angular";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import {ConfigServiceService} from "../config/config-service.service";

@Injectable({
  providedIn: 'root'
})
export class IndexDbServiceService {

  public db = new IndexedDBAngular('carepoolOfflineDb', 1);
  constructor(private configService: ConfigServiceService) { this.db.createStore(1, this.createCollections);}
  createCollections(db) {
    db.currentTarget.result.createObjectStore('diagnosis',{keyPath: 'id', autoIncrement: true});
    db.currentTarget.result.createObjectStore('pricelistitem',{keyPath: 'id', autoIncrement: true});
    db.currentTarget.result.createObjectStore('treatments',{keyPath: 'treatmentCode', autoIncrement: true});
  }

  getByKey(storeName, key):Promise<any>{
    return this.db.getByKey(storeName, key);
  }

  getByIndex(storeName, key, value):Promise<any>{
    return this.db.getByIndex(storeName, key, value);
  }

  getAll(storeName):Promise<any>{
    return this.db.getAll(storeName);
  }

  add(stroreName, object):Promise<any>{
    return this.db.add(stroreName, object);
  }


  query(storeName, index, searchTerm):Promise<any[]>{
    let results:any[]=[];
    return this.db.openCursor(storeName,(res:any)=>{
      let cursor:any = res.target.result;
      if(cursor) {
        let resul:string = cursor.value[index];
        console.log(resul);
        if(resul != null){
          if(resul.indexOf(searchTerm)>=0){
            results.push(cursor.value);
          }
        }
        cursor.continue();
      } else {
        console.log('no more entries');
      }
    }).then(ff=>{return results});
  }

  update(stroreName, object): Promise<any>{
    return this.db.update(stroreName, object);
  }

  delete(stroreName, key): Promise<any>{
    return this.db.delete(stroreName, key);
  }

  clear(storeName): Promise<any>{
    return this.db.clear(storeName);
  }

}
