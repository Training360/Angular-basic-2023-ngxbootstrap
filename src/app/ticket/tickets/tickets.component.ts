import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IBtn, IBtnGroupOutput } from 'src/app/common/btn-group/btn-group.component';
import { Ticket } from 'src/app/model/ticket';
import { TicketService } from 'src/app/service/ticket.service';
import { BooleanPipe } from '../../pipe/boolean.pipe';
import { ArrayFilterPipe } from '../../pipe/array-filter.pipe';
import { BtnGroupComponent } from '../../common/btn-group/btn-group.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FilterComponent, IFilterItems } from '../filter/filter.component';
import { FilterPipe } from '../filter/filter.pipe';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastService } from 'src/app/common/toast.component';
import { ToasterService } from 'src/app/common/toaster.component';

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.scss'],
    standalone: true,
    imports: [RouterLink, NgIf, NgFor, BtnGroupComponent, AsyncPipe,
      ArrayFilterPipe, BooleanPipe,
      FilterComponent,
      FilterPipe,
      AlertModule,
    ],
})
export class TicketsComponent {

  router: Router = inject(Router);

  ticketService: TicketService = inject(TicketService);

  toastService = inject(ToastService);

  toasterService = inject(ToasterService);

  title = 'angular-directives';

  isSearchBarVisible: boolean = false;

  filterPhrase: string = '';

  filterKey: string = '';

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

  onGroupClick(details: IBtnGroupOutput) {
    switch (details.name) {
      case 'remove':
        this.toasterService.add(`You don't have the right to delete!`, 3000, 'danger');
        // this.toastService.show(`You don't have the right to delete!`, 3000, 'danger');
        // this.ticketService.dispatch('delete', (details.data as Ticket));
        break;
      case 'show':
        this.router.navigate(['/ticket', 'edit', details.data.id]);
        // this.ticketService.dispatch('get', details.data.id);
        break;
    }
  }
}
