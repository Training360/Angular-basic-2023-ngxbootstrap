import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IBtn {
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  name: string;
  icon?: string;
}

export interface IBtnGroupOutput {
  name: string;
  data: any;
}

@Component({
  selector: 'app-btn-group',
  templateUrl: './btn-group.component.html',
  styleUrls: ['./btn-group.component.scss']
})
export class BtnGroupComponent {
  @Input() buttons: IBtn[] = [];

  @Input() data: any = null;

  @Output() btnClick: EventEmitter<IBtnGroupOutput> = new EventEmitter();

  raiseClick(name: string): void {
    this.btnClick.emit({name, data: this.data});
  }
}
