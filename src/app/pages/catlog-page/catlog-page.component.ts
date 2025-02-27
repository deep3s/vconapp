import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../services/catalog/catalog.service";

@Component({
  selector: 'catlog-page',
  templateUrl: './catlog-page.component.html',
  styleUrls: ['./catlog-page.component.scss']
})
export class CatlogPageComponent implements OnInit {
  searchTerm: string = '';

  categories: any = [];
  selectedCategory: any = {services: []}

  services = [];


  selectCategory(category: any ){
    this.categories = this.categories.map(ct=> {
      ct.active = false;
      return ct;
    })

    category.active = true;
    this.selectedCategory = category;
  }

  constructor(private catalogService: CatalogService) {

  }
  ngOnInit(): void {
    this.getAllCategories();
  }

 getAllCategories(){
    this.catalogService.getAllCatalog().pipe().subscribe(
        (categories:any) => {
          this.categories = categories;
          this.selectedCategory = categories[0];
          this.selectedCategory.active = true;
        }
    );

 }

  quickBooking() {
    console.log("Quick Booking Link Clicked");
    // Add your logic here
  }

  setMenuOrder() {
    console.log("Set Menu Order Clicked");
    // Add your logic here
  }

  openSettings() {
    console.log("Settings Clicked");
    // Add your logic here
  }

  downloadPDF() {
    console.log("Download PDF Clicked");
    // Add your logic here (generate/download PDF)
  }

  downloadExcel() {
    console.log("Download Excel Clicked");
    // Add your logic here (generate/download Excel)
  }
  addSingleService() {
    console.log("Adding Single Service");
    // Add your logic here
  }

  addPackage() {
    console.log("Adding Package");
    // Add your logic here
  }

  addCategory() {
    console.log("Adding Category");
    // Add your logic here
  }

  // Apply Filters from Modal
  applyFilters() {
    console.log("Filters Applied");
    // Implement filter logic (fetch services based on selection)
  }

}
