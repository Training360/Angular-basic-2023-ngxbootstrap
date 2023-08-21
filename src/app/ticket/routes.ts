import { Route } from "@angular/router";

export const TICKET_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    loadComponent: () => import('./tickets/tickets.component').then(
      m => m.TicketsComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./ticket-editor/ticket-editor.component').then(
      m => m.TicketEditorComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./ticket-create/ticket-create.component').then(
      m => m.TicketCreateComponent)
  },
];
