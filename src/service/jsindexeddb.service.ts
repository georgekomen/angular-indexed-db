import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsindexeddbService {

  constructor() {
    this.init();
  }

  init(){
    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
    let indexedDB: IDBFactory = <any>window.indexedDB;
    // let indexedDB: IDBFactory = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

    // Open (or create) the database
    let open = indexedDB.open("MyDatabase", 2);

    // Create the schema
    open.onupgradeneeded = function(e:any) {
      let db:IDBDatabase = e.target.result;
      let rowDef: IDBObjectStoreParameters;

      rowDef = { keyPath: "id" };
      let store:IDBObjectStore = db.createObjectStore("MyObjectStore", rowDef);
      let index = store.createIndex("NameIndex", ["name.last", "name.first"]);
    };

    open.onsuccess = function(e:any) {
      // Start a new transaction
      let db1 = e.target.result;
      let tx = db1.transaction("MyObjectStore", "readwrite");
      let store = tx.objectStore("MyObjectStore");
      let index = store.index("NameIndex");

      // Add some data
      store.put({id: 12345, name: {first: "John", last: "Doe"}, age: 42});
      store.put({id: 67890, name: {first: "Bob", last: "Smith"}, age: 35});

      // Query the data
      let getJohn = store.get(12345);
      let getBob = index.get(["Smith", "Bob"]);

      getJohn.onsuccess = function(e) {
        console.log(getJohn.result.name.first);  // => "John"
      };

      getBob.onsuccess = function(e) {
        console.log(getBob.result.name.first);   // => "Bob"
      };

      // Close the db when the transaction is done
      tx.oncomplete = function(e) {
        db1.close();
      };

    };
  }
}
