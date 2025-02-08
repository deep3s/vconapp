import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss']
})
export class AppSelectComponent {
    @Input() public title: string;
    @Input() public items: any[];
    @Input() public selectedValue: any;

    @Output() public onValueChange: EventEmitter<any> = new EventEmitter();

    onChange(){
        this.onValueChange.emit(this.selectedValue);
    }
}
