import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService<Ticket> {

  constructor() {
    super('tickets');
  }

}
