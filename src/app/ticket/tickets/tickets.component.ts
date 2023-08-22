import { Component, TemplateRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IBtn, IBtnGroupOutput } from 'src/app/common/btn-group/btn-group.component';
import { Ticket } from 'src/app/model/ticket';
import { TicketService } from 'src/app/service/ticket.service';
import { BooleanPipe } from '../../pipe/boolean.pipe';
import { ArrayFilterPipe } from '../../pipe/array-filter.pipe';
import { BtnGroupComponent } from '../../common/btn-group/btn-group.component';
import { NgIf, NgFor, AsyncPipe, SlicePipe } from '@angular/common';
import { FilterComponent, IFilterItems } from '../filter/filter.component';
import { FilterPipe } from '../filter/filter.pipe';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastService } from 'src/app/common/toast.component';
import { ToasterService } from 'src/app/common/toaster.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss'],
    standalone: true,
    providers: [
      BsModalService,
    ],
    imports: [
      RouterLink,
      NgIf,
      NgFor,
      FormsModule,
      BtnGroupComponent,
      AsyncPipe,
      SlicePipe,
      ArrayFilterPipe,
      BooleanPipe,
      FilterComponent,
      FilterPipe,
      AlertModule,
      PaginationModule,
    ],
})
export class TicketsComponent {

  router: Router = inject(Router);

  ticketService: TicketService = inject(TicketService);

  toastService = inject(ToastService);

  toasterService = inject(ToasterService);

  modalService: BsModalService = inject(BsModalService);

  modalRef?: BsModalRef;

  selectedTicket: Ticket | null = null;

  isSearchBarVisible: boolean = false;

  filterPhrase: string = '';

  filterKey: string = '';

  // Pagination
  totalItems: number = 0;

  currentPage: number = 1;

  smallnumPages: number = 0;

  step: number = 25;

  tickets: Ticket[] = [
    {
      id: 1,
      checked: false,
      flightNumber: 'WA12345',
      seat: 'D3',
      service: 'tourist',
    },
    {
      id: 2,
      checked: true,
      flightNumber: 'WA12345',
      seat: 'D4',
      service: 'tourist',
    },
    {
      id: 3,
      checked: false,
      flightNumber: 'WA12345',
      seat: 'F5',
      service: 'tourist',
    },
  ];

  btnGroup: IBtn[] = [
    { name: 'show', type: 'info', icon: 'fa-eye' },
    { name: 'remove', type: 'danger', icon: 'fa-trash' },
  ];

  filterOptions = [
    {val: '', text: 'choose a key'},
    {val: 'id', text: 'ID'},
    {val: 'flightNumber', text: 'F.N.'},
    {val: 'seat', text: 'Seat'},
    {val: 'service', text: 'Service'},
  ];

  tickets$ = this.ticketService.list$;

  selectedTicket$ = this.ticketService.one$;

  ngOnInit(): void {
    this.ticketService.dispatch('getAll');

    this.selectedTicket$.subscribe(console.log);
  }

  toggleSearchBar(): void {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  onFilter(values: IFilterItems): void {
    console.log(values)
    this.filterKey = values.key;
    this.filterPhrase = values.phrase;
  }

  onGroupClick(details: IBtnGroupOutput, confirm: TemplateRef<any>) {
    switch (details.name) {
      case 'remove':
        this.selectedTicket = details.data as Ticket;
        this.modalRef = this.modalService.show(confirm, {class: 'modal-sm'});
        // this.toasterService.add(`You don't have the right to delete!`, 3000, 'danger');
        // this.toastService.show(`You don't have the right to delete!`, 3000, 'danger');
        // this.ticketService.dispatch('delete', (details.data as Ticket));
        break;
      case 'show':
        this.router.navigate(['/ticket', 'edit', details.data.id]);
        // this.ticketService.dispatch('get', details.data.id);
        break;
    }
  }

  confirmDelete(): void {
    this.ticketService.dispatch('delete', this.selectedTicket);
    this.selectedTicket = null;
    this.modalRef?.hide();
  }

  declineDelete(): void {
    this.modalRef?.hide();
  }
}
