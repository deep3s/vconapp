import flatpickr from "flatpickr";

// Initialize Flatpickr for the "Any Date" input
export function initializeFlatpickr() {
    flatpickr("#datePicker", {
        enableTime: false, // Set to true if you want a time picker
        dateFormat: "Y-m-d", // Customize the date format
    });
}
