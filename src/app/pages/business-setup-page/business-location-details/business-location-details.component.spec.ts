import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { EditLocationComponent } from './edit-location.component';

import { BusinessLocationDetailsComponent } from './business-location-details.component';
import {EditLocationComponent} from "../edit-location/edit-location.component";

describe('BusinessLocationDetailsComponent', () => {
    let component: BusinessLocationDetailsComponent;
    let fixture: ComponentFixture<BusinessLocationDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BusinessLocationDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BusinessLocationDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

describe('EditLocationComponent', () => {
    let component: EditLocationComponent;
    let fixture: ComponentFixture<EditLocationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditLocationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EditLocationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
