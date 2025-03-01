import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MANAGE_SETTINGS_CONSTANTS} from "../../shared/manageSetting-constants";
import {CatalogService} from "../../services/catalog/catalog.service";

@Component({
  selector: 'new-service-page',
  templateUrl: './new-service-page.component.html',
  styleUrls: ['./new-service-page.component.scss']
})
export class NewServicePageComponent implements OnInit {
  serviceDetailsForm: FormGroup;
  submitted = false;

  warning_1: any = MANAGE_SETTINGS_CONSTANTS.Warning_1


  details: any = [
    {name: 'Basic details', active: true},
    {name:'Locations',active: false},
    {name: 'Team members',active: false},
    {name: 'Resources',active: false},
  ];

  settings: any = [
    {name: 'Online booking',active:false},
    {name: 'Forms',active:false},
    {name: 'Commissions',active:false},
    {name: 'Settings',active:false},
  ];

  selectedDetails: any = this.details[0];


  selectedWarning1: any = {};

  selectedCategory: any = {};
  categories: any = [];

  constructor(private formBuilder: FormBuilder,
              private catalogService:CatalogService) {
    // console.log(data);
    this.populateCategories();
  }

  ngOnInit(): void {
    this.serviceDetailsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['',[Validators.required]],
      duration: ['',[Validators.required]],
      price: ['',[Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get fmp(): any {
    return this.serviceDetailsForm.controls;
  }

  applyPrev(selectedValue: any) : void {
    console.log(selectedValue);
  }


  selectedCategoryChange(selectedValue: any) : void {
    this.selectedCategory = selectedValue;
  }



  onSubmitServiceDetails() {
    this.submitted = true;
    if(this.serviceDetailsForm.valid){
      let serviceDetails = {...this.serviceDetailsForm.value, categoryId: this.selectedCategory};
      this.catalogService.createService(serviceDetails).pipe().subscribe(
          () => {
            this.goToCatalogDetails();
          }, (err: any) => {
            console.log(err)
          });
      console.log(serviceDetails );
    }
   /* let businessDetails = {...this.businessDetailsForm.value};

    if (this.businessDetails?.id) {
      this.businessSetupService.updateBusinessDetails(
          {...this.businessDetails, ...businessDetails}).pipe().subscribe(
          () => {
            this.goToBusinessDetails();
          }, (err: any) => {
            console.log(err)
          });
    } else {
      this.businessSetupService.saveBusinessDetails(businessDetails).pipe().subscribe(
          () => {
            this.goToBusinessDetails();
          }, (err: any) => {
            console.log(err)
          });
    }*/
  }
  goToCatalogDetails(): void {

  }
  selectDetails(selected: any) {
    // Reset active state for all items in both arrays
    this.details.forEach(item => item.active = false);
    this.settings.forEach(item => item.active = false);

    // Set active state for the clicked item
    selected.active = true;
  }
 populateCategories(){
   this.catalogService.getAllCatalog().pipe().subscribe(
       (categories:any) => {
         this.categories = categories.filter(category => category.id !== null);
       }
   );
 }

}
