import { Component, Input, OnInit, inject, numberAttribute } from '@angular/core';
import { TicketService } from 'src/app/service/ticket.service';
import { FormsModule } from '@angular/forms';
import { NgIf, AsyncPipe, Location } from '@angular/common';
import { Ticket } from 'src/app/model/ticket';

@Component({
    selector: 'app-ticket-editor',
    templateUrl: './ticket-editor.component.html',
    styleUrls: ['./ticket-editor.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, AsyncPipe]
})
export class TicketEditorComponent implements OnInit {

  ticketService = inject(TicketService);

  location: Location = inject(Location);

  @Input({transform: numberAttribute, alias: 'id'}) ticketID = 0;

  ticket$ = this.ticketService.one$;

  ngOnInit(): void {
    if (this.ticketID) {
      this.ticketService.dispatch('get', this.ticketID);
    }
  }

  onSave(ticket: Ticket): void {
    this.ticketService.update(ticket).subscribe(
      updated => this.location.back()
    );
  }
}
