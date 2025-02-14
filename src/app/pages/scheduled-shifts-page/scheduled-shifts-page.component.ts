import {Component, HostListener, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-scheduled-shifts-page',
  templateUrl: './scheduled-shifts-page.component.html',
  styleUrls: ['./scheduled-shifts-page.component.scss']
})
export class ScheduledShiftsPageComponent {
  constructor(private router: Router) {}

  selectedDate: Date = new Date();
  selectedMemberIndex: number | null = null;
  selectedSlotIndex: number | null = null;
  selectedEditMemberIndex: number | null = null;
  dropdownX: number = 0;
  dropdownY: number = 0;

  @ViewChild('picker') datepicker!: MatDatepicker<Date>;

  openDatePicker(event: Event) {
    event.stopPropagation(); // Prevents event bubbling issues
    this.datepicker.open();
  }

  weekDays = [
    { date: 'Mon, 10 Feb', hours: '18h' },
    { date: 'Tue, 11 Feb', hours: '18h' },
    { date: 'Wed, 12 Feb', hours: '18h' },
    { date: 'Thu, 13 Feb', hours: '18h' },
    { date: 'Fri, 14 Feb', hours: '18h' },
    { date: 'Sat, 15 Feb', hours: '14h' },
    { date: 'Sun, 16 Feb', hours: '0min' },
  ];

  members = [
    {
      name: 'Joshna MJ',
      avatar: 'https://cdn-partners-api.fresha.com/user-account-avatars/processed/697997/medium/edb7000e-9214-4089-9b5f-058eff372134-avatar.png',
      hours: '52h',
      slots: ['10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 5pm', ''],
    },
    {
      name: 'Wendy Smith',
      avatar: 'https://cdn-partners.fresha.com/assets-v2/cbdf86c52d5cb265d459.png',
      hours: '52h',
      slots: ['10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 5pm', ''],
    },
  ];


  // Toggle time slot dropdown
  toggleDropdown(event: MouseEvent, memberIndex: number, slotIndex: number) {
    event.stopPropagation();
    if (this.selectedMemberIndex === memberIndex && this.selectedSlotIndex === slotIndex) {
      this.selectedMemberIndex = null;
      this.selectedSlotIndex = null;
    } else {
      this.selectedMemberIndex = memberIndex;
      this.selectedSlotIndex = slotIndex;
    }
  }

  // Toggle edit dropdown for the edit icon
  toggleEditDropdown(memberIndex: number, event: MouseEvent) {
    event.stopPropagation();
    if (this.selectedEditMemberIndex === memberIndex) {
      this.selectedEditMemberIndex = null;
    } else {
      this.selectedEditMemberIndex = memberIndex;
      this.dropdownX = event.clientX;
      this.dropdownY = event.clientY;
    }
  }

  // Close all dropdowns when clicking outside
  closeDropdowns() {
    this.selectedMemberIndex = null;
    this.selectedSlotIndex = null;
    this.selectedEditMemberIndex = null;
  }

  // Sample actions
  setRegularShifts() { alert('Set regular shifts clicked'); }
  unassignFromLocation() { alert('Unassign from location clicked'); }
  editTeamMember() { alert('Edit team member clicked'); }
  deleteAllShifts() { alert('Delete all shifts clicked'); }
  editDay() { alert('Edit this day clicked'); }
  addTimeOff() { alert('Add time off clicked'); }
  deleteShift() { alert('Delete this shift clicked'); }

  prevDate() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.selectedDate = new Date(this.selectedDate);
  }

  nextDate() {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.selectedDate = new Date(this.selectedDate);
  }

  setToday() {
    this.selectedDate = new Date();
  }

  onAdd() {
    this.router.navigate(['/business-setup']);
  }

  tooltipVisible = false;
  tooltipX = 0;
  tooltipY = 0;
  tooltipData = { date: '', bookable: 0, nonBookable: 0 };

  showShiftDetails(event: MouseEvent, day: any) {
    this.tooltipData = {
      date: day.date,
      bookable: day.bookableHours,
      nonBookable: day.nonBookableHours
    };

    this.tooltipX = event.clientX;
    this.tooltipY = event.clientY - 50; // Adjust to position above the clicked th

    this.tooltipVisible = true;

    setTimeout(() => {
      this.tooltipVisible = false; // Hide after a delay
    }, 3000);
  }

  addShift(memberIndex: number, slotIndex: number) {
    this.members[memberIndex].slots[slotIndex] = "10am - 7pm"; // Default shift
  }

}
