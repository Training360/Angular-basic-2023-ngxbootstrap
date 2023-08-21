import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { SharedModule } from '../shared.module';
import { TicketEditorComponent } from './ticket-editor/ticket-editor.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';


@NgModule({
  declarations: [
    TicketsComponent,
    TicketEditorComponent,
    TicketCreateComponent,
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class TicketModule { }
