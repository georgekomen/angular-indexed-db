import {MonetaryValue} from "./treatment";

export class Product {
  id?: number;
  productName?: string;
  productCode?: string;
  price? = new MonetaryValue();
  modificationTime?: string;
  status?: any;
  type?: any;
}
