import {Component, Input, OnInit} from '@angular/core';
import {DiagnosisServiceService} from "../../service/diagnosis-service.service";
import {IndexDbServiceService} from "../../service/index-db-service.service";
import {ConfigServiceService} from "../../config/config-service.service";
import {Diagnosis, Treatment} from "../../domain/treatment";
import {DiagnosisSearchResults} from "../../domain/diagnosisSearchResults";

@Component({
  selector: 'app-treatment-diagnosis',
  templateUrl: './treatment-diagnosis.component.html',
  styleUrls: ['./treatment-diagnosis.component.scss']
})
export class TreatmentDiagnosisComponent implements OnInit {

  @Input() treatment: Treatment;

  results:string[]=[];
  text:string;
  constructor(private indexeddbservice:IndexDbServiceService, private configService: ConfigServiceService){

  }

  ngOnInit() {
  }

  adddiagnosis(evt){
    console.log(evt);
    const diag: DiagnosisSearchResults = evt;
    let diag1 = new Diagnosis();
    diag1.diagnosisRef = diag.id;
    diag1.description = diag.diagnosisName;
    diag1.status = 'active';
    diag1.id = diag.id;
    this.treatment.treatmentDiagnoses.push(diag1);
    this.indexeddbservice.update(this.configService.storeName.treatments,this.treatment).then(res => {
        this.text='';
    }, (error) => {
      this.text='';
    });
  }

  delete(id){
    this.treatment.treatmentDiagnoses.splice(this.treatment.treatmentDiagnoses.findIndex(ff=>ff.id==id),1);
    this.indexeddbservice.update(this.configService.storeName.treatments,this.treatment);
  }

  search(evt){
    setTimeout(()=>{
      const searchTerm = evt.query;
      this.query(this.configService.storeName.diagnosis,this.configService.indexName.diagnosisName,searchTerm).then(res=>{
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
