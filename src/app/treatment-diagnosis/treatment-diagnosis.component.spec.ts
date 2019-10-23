import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentDiagnosisComponent } from './treatment-diagnosis.component';

describe('TreatmentDiagnosisComponent', () => {
  let component: TreatmentDiagnosisComponent;
  let fixture: ComponentFixture<TreatmentDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
