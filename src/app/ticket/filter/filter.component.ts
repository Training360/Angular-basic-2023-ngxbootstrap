import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';

export interface IFilterItems {
  phrase: string;
  key: string;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() options: {val: string, text: string}[]= [];

  @Output() filter: EventEmitter<IFilterItems> = new EventEmitter();

  key: FormControl = new FormControl();

  phrase: FormControl = new FormControl();

  ngOnInit(): void {
    combineLatest([
      this.key.valueChanges,
      this.phrase.valueChanges,
    ]).subscribe(values => this.filter.emit({
      key: values[0],
      phrase: values[1],
    }));

    this.key.setValue('');
    this.phrase.setValue('');
  }

}
