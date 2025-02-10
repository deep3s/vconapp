import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
    selector: 'app-sales-page',
    templateUrl: './sales-page.component.html',
    styleUrls: ['./sales-page.component.scss']
})
export class SalesPageComponent {
    selectedRowIndex: number | null = null;
    selectedSidebarItem: string | null = null;
    disableNext: boolean = false;
    selectedDate: Date = new Date();

    sidebarItems = [
        'Daily sales summary',
        'Appointments',
        'Sales',
        'Payments',
        'Gift cards sold',
        'Memberships sold'
    ];

    transactionSummary = [
        {type: 'Service', salesQty: 10, refundQty: 1, grossTotal: 5000},
        {type: 'Product', salesQty: 5, refundQty: 0, grossTotal: 2500},
        {type: 'Shipping', salesQty: 10, refundQty: 1, grossTotal: 5000},
        {type: 'Gift cards', salesQty: 5, refundQty: 0, grossTotal: 2500},
        {type: 'Memberships', salesQty: 10, refundQty: 1, grossTotal: 5000},
        {type: 'Late cancellation fees', salesQty: 5, refundQty: 0, grossTotal: 2500},
        {type: 'No-show fees', salesQty: 10, refundQty: 1, grossTotal: 5000},
        {type: 'Refund amount', salesQty: 5, refundQty: 0, grossTotal: 2500},
    ];

    cashSummary = [
        {type: 'Cash', collected: 3000, refunded: 500},
        {type: 'Card', collected: 4500, refunded: 1000},
        {type: 'Cash', collected: 3000, refunded: 500},
        {type: 'Card', collected: 4500, refunded: 1000},
    ];
    services = [
        { name: 'Manicure', price: 25 },
        { name: 'Hair Color', price: 57 },
        { name: 'Haircut', price: 40 },
        { name: 'Balayage', price: 150 },
        { name: 'Classic Fill', price: 60 },
        { name: 'Blow Dry', price: 35 }
    ];

    selectRow(event: Event) {
        const target = event.target as HTMLElement;
        if (target.closest('tr')) {
            this.selectedRowIndex = Array.from(target.closest('tbody')!.children).indexOf(target.closest('tr')!);
        }
    }

    selectSidebarItem(item: string) {
        this.selectedSidebarItem = item;
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

    onDateChange(event: any) {
        if (event.value) {
            this.selectedDate = event.value;
        }
    }
    isPanelOpen = false;

    openPanel() {
        this.isPanelOpen = true;
    }

    closePanel() {
        this.isPanelOpen = false;
    }

}

/* selectedRowIndex: number | null = null;
 selectedPaymentRowIndex: number | null = null;

 transactionSummary = [
   { type: 'Services', salesQty: 0, refundQty: 0, grossTotal: 0 },
   { type: 'Products', salesQty: 0, refundQty: 0, grossTotal: 0 },
   { type: 'Shipping', salesQty: 0, refundQty: 0, grossTotal: 0 },
   { type: 'Gift cards', salesQty: 0, refundQty: 0, grossTotal: 0 },
   { type: 'Memberships', salesQty: 0, refundQty: 0, grossTotal: 0 },
   { type: 'Late cancellation fees', salesQty: 0, refundQty: 0, grossTotal: 0 },
   { type: 'No-show fees', salesQty: 0, refundQty: 0, grossTotal: 0 },
   { type: 'Refund amount', salesQty: 0, refundQty: 0, grossTotal: 0 },
 ];

 cashSummary = [
   { type: 'Cash', collected: 0, refunded: 0 },
   { type: 'Other', collected: 0, refunded: 0 },
   { type: 'Gift card redemptions', collected: 0, refunded: 0 },
   { type: 'Payments collected', collected: 0, refunded: 0 },
 ];

 selectRow(index: number) {
   this.selectedRowIndex = index;
 }

 selectPaymentRow(index: number) {
   this.selectedPaymentRowIndex = index;
 }*/

