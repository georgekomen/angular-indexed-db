import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TreatmentItemComponent } from './treatment-item/treatment-item.component';
import { TreatmentDiagnosisComponent } from './treatment-diagnosis/treatment-diagnosis.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { TreatmentListComponent } from './treatment-list/treatment-list.component';
@NgModule({
  declarations: [
    AppComponent,
    TreatmentItemComponent,
    TreatmentDiagnosisComponent,
    TreatmentComponent,
    TreatmentListComponent
  ],
  imports: [
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ] // for multitransclusion on ng-content
})
export class AppModule {

}
