import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-scheduled-shifts-page',
  templateUrl: './scheduled-shifts-page.component.html',
  styleUrls: ['./scheduled-shifts-page.component.scss']
})
export class ScheduledShiftsPageComponent {
  constructor(private router: Router) {}
  selectedDate: Date = new Date();
  weekDays = [
    { date: 'Mon, 10 Mar', hours: '18h' },
    { date: 'Tue, 11 Mar', hours: '18h' },
    { date: 'Wed, 12 Mar', hours: '18h' },
    { date: 'Thu, 13 Mar', hours: '18h' },
    { date: 'Fri, 14 Mar', hours: '18h' },
    { date: 'Sat, 15 Mar', hours: '14h' },
    { date: 'Sun, 16 Mar', hours: '0min' },
  ];

  members = [
    {
      name: 'Joshna MJ',
      avatar: 'https://via.placeholder.com/40',
      hours: '52h',
      slots: ['10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 5pm', ''],
    },
    {
      name: 'Wendy Smith',
      avatar: 'https://via.placeholder.com/40',
      hours: '52h',
      slots: ['10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 7pm', '10am - 5pm', ''],
    },
  ];

  selectedMemberIndex: number | null = null;
  selectedSlotIndex: number | null = null;
  selectedEditMemberIndex: number | null = null;
  dropdownX: number = 0;
  dropdownY: number = 0;

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
  onAdd() {
    this.router.navigate(['/business-setup-page']);
  }

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

}
