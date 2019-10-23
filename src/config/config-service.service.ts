import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  public userUrl: string = '';
  public providerUrl: string = '';
  public financeUrl: string = '';
  public pricelistUrl: string = '';
  public programUrl: string = '';
  public productUrl: string = '';
  public claimUrl: string = '';

  public storeName = {
    diagnosis: 'diagnosis',
    pricelistitem: 'pricelistitem',
    treatments: 'treatments'
  };

  public indexName = {
    diagnosisName:'diagnosisName',
    productName:'productName'
};

  constructor() {
    this.setTestUrlEndpoints();
  }

  setTestUrlEndpoints() {
    this.userUrl = 'env';
    this.providerUrl = 'env';
    this.financeUrl = 'env';
    this.pricelistUrl = 'env';
    this.programUrl = 'env';
    this.productUrl = 'env';
    this.claimUrl = 'env';
  }
}
