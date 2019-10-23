export class Treatment {
  fingerprintVerified?: boolean;
  accountHolderRef?: any;
  beneficiaryRef?:any;
  id?: number;
  programRef?: number;
  dateCreated?: string;
  dateTreatment?: string;
  dateModified?: string;
  patientName?: string;
  phoneNumber?: string;
  providerRef?: number;
  status?: string;
  dateScheduled?: string;
  treatmentCode?: string;
  treatmentDiagnoses?: Diagnosis[]=[];
  doctorNotes?: Notes[];
  payments?: Payment[] = [];
  invoices?: Invoices[] = [];
  amount?: number; //for download
  totalBill? = new MonetaryValue();
  currentInvoice?: Invoices;
  insuranceCoverRef?: number;
}

export class Notes {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  createdBy?: string;
  modifiedBy?: string;
  comments?: string;
}

export class Diagnosis {
  status?: string;
  diagnosisRef?: number;
  description?: string;
  id?: number;
}

export class PreAuthInterface{
  id?: number;
  status?: string;
  admissionDate?: any;
  lengthOfStay?:string;
  doctor?:string;
  requestedAmount? = new MonetaryValue();
}

export class Payment {
  preAuthorizations?: PreAuthInterface[] = [];
  type?: string;
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  amount? = new MonetaryValue();
  reference?: string;
  accountRef?: number;
  status?: string;
  programRef?: number;
  requireFingerprint?: boolean;
}


export class MonetaryValue {
  amount?: number;
  currency?: string;
}

export class Invoices {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  amount?: string;
  documents?: InvoiceDocument[]=[];
  invoiceNotes?: any[] = [];
  items?: Item[] = [];
  status?: string;
  draft?: boolean;
  total?: number;
}

export class InvoiceDocument{
  dateCreated?: string;
  dateModified?: string;
  id?: number;
  documentType?: string;
  imageUrl?: string;
}


export class Item {
  id?: number;
  dateCreated?: string;
  dateModified?: string;
  quantity?:  number;
  productRef?: number;
  description?: string;
  unitPrice? = new MonetaryValue();
  status?: string;
  productCode: string;
  preauthorization?: boolean;
  programRef?: number;
  programName?: string;
}
