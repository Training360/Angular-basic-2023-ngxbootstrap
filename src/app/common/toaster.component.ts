import { Component, Injectable, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { AlertModule } from 'ngx-bootstrap/alert';
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);

export interface IToast {
  body: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  toasters$: BehaviorSubject<IToast[]> = new BehaviorSubject<IToast[]>([]);

  add(body: string, timeOut: number = 0, type: string = 'primary'): void {
    const toast: IToast = {
      body,
      type
    };

    const list = this.toasters$.getValue();
    list.push(toast);
    this.toasters$.next(list);

    if (timeOut > 0) {
      const to = setTimeout(() => {
        clearTimeout(to);
        this.remove(toast);
      }, timeOut);
    }
  }

  remove(toast: IToast): void {
    const list = this.toasters$.getValue();
    const index = list.findIndex(i => i === toast);
    list.splice(index, 1);
    this.toasters$.next(list);
  }

}

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule, AlertModule, AsyncPipe],
  animations: [
    fadeAnimation,
  ],
  template: `
  <div *ngIf="list$ | async as list" class="toast-container mx-2 my-2">
    <div
      @fadeAnimation
      *ngFor="let toast of list"
      [ngClass]="getClass(toast)"
      class="toast align-items-center text-white border-0 show mb-1">
      <div class="d-flex">
        <div class="toast-body">
          {{ toast.body }}
        </div>
        <button (click)="onClose(toast)" class="btn-close btn-close-white me-2 m-auto"></button>
      </div>
    </div>
  </div>
  `,
  styles: [
    `.toast-container {
      min-width: 22rem;
      max-width: 90vw;
      z-index: 1;
      position: fixed;
      bottom: 0;
      right: 0;
    }`
  ],
})
export class ToasterComponent {

  service: ToasterService = inject(ToasterService);

  list$ = this.service.toasters$;

  onClose(toast: IToast): void {
    this.service.remove(toast);
  }

  getClass(item: IToast): any {
    return {
      [`bg-${item.type}`]: true,
    };
  };

}
