import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/pages/business-setup-page/business-location-details/business-location-details.component.spec.ts
import { BusinessLocationDetailsComponent } from './business-location-details.component';

describe('BusinessLocationDetailsComponent', () => {
  let component: BusinessLocationDetailsComponent;
  let fixture: ComponentFixture<BusinessLocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessLocationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessLocationDetailsComponent);
========
import { EditLocationComponent } from './edit-location.component';

describe('EditLocationComponent', () => {
  let component: EditLocationComponent;
  let fixture: ComponentFixture<EditLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLocationComponent);
>>>>>>>> d5c6600c050a4485744be50afaedb10dcc68fa40:src/app/pages/business-setup-page/edit-location/edit-location.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
