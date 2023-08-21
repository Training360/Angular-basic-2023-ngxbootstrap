import { Component, Input, OnInit, inject, numberAttribute } from '@angular/core';
import { TicketService } from 'src/app/service/ticket.service';

@Component({
  selector: 'app-ticket-editor',
  templateUrl: './ticket-editor.component.html',
  styleUrls: ['./ticket-editor.component.scss']
})
export class TicketEditorComponent implements OnInit {

  ticketService = inject(TicketService);

  @Input({transform: numberAttribute, alias: 'id'}) ticketID = 0;

  ticket$ = this.ticketService.one$;

  ngOnInit(): void {
    if (this.ticketID) {
      this.ticketService.dispatch('get', this.ticketID);
    }
  }
}
