import { Injectable } from '@angular/core';
import {SwUpdate} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class CheckServerUpdatesService {

  constructor(private updates: SwUpdate) {

  }

  public check(){
    this.updates.available.subscribe(event => {
      if (confirm('install update?')) {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
