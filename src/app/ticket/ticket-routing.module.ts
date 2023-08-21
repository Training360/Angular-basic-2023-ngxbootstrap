import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketEditorComponent } from './ticket-editor/ticket-editor.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';

const routes: Routes = [
  { path: '', component: TicketsComponent },
  { path: 'edit/:id', component: TicketEditorComponent },
  { path: 'create', component: TicketCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
