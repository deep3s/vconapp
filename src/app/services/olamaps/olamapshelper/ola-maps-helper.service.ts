import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OlaMapsHelperService {

  constructor() { }

  simplifyAddressComponents(addressComponents: any) {
    const simplified: any = {};
    addressComponents.forEach((component: any) => {
      component.types.forEach((type: string) => {
        simplified[type] = component.short_name;
      });
    });
    return {
      district: simplified?.postal_town,
      city: simplified?.administrative_area_level_2,
      subDivision: simplified?.administrative_area_level_3,
      state: simplified?.administrative_area_level_1,
      postCode:simplified?.postal_code,
      country: simplified?.country,
    };
  }
}
