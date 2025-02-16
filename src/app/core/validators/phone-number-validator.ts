import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
  const phoneRegex = /^[0-9]{10}$/; // Adjust the regex as needed
  if (!control.value || phoneRegex.test(control.value)) {
    return null; // Valid
  }
  return { invalidPhoneNumber: true }; // Invalid
}
