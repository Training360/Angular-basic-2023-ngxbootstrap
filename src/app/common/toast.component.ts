import { Component, Injectable, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  hidden$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  body$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  type$: BehaviorSubject<string> = new BehaviorSubject<string>('primary');

  show(body: string, timeOut: number = 0, type: string = 'primary'): void {
    this.body$.next(body);
    this.type$.next(type);
    this.hidden$.next(false);

    if (timeOut > 0) {
      const to = setTimeout( () => {
        clearTimeout(to);
        this.hide();
       }, timeOut );
    }
  }

  hide(): void {
    this.hidden$.next(true);
  }
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [ngClass]="getClass()"
      class="toast align-items-center text-white border-0 fade"
      role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          <strong>{{ body }}</strong>
        </div>
        <button (click)="onClose()" type="button" class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `,
  styles: []
})
export class ToastComponent implements OnInit {

  toastService: ToastService = inject(ToastService);

  body: string = 'Toast message.';

  hidden: boolean = true;

  type: string = '';

  getClass(): any {
    return {
      'show': !this.hidden,
      'position-fixed': true,
      'end-0': true,
      'bottom-0': true,
      'my-2': true,
      'mx-2': true,
      'bg-primary': this.type === 'primary',
      'bg-info': this.type === 'info',
      'bg-danger': this.type === 'danger',
      'bg-warning': this.type === 'warning',
    };
  };

  ngOnInit(): void {
    combineLatest([
      this.toastService.body$,
      this.toastService.hidden$,
      this.toastService.type$
    ]).subscribe((values: [string, boolean, string]) => {
      this.body = values[0];
      this.hidden = values[1];
      this.type = values[2];
    });
  }

  onClose(): void {
    this.toastService.hide();
  }
}
