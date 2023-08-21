import { Component, OnInit, inject } from '@angular/core';
import { Ticket } from './model/ticket';
import { IBtn, IBtnGroupOutput } from './common/btn-group/btn-group.component';
import { BaseService } from './service/base.service';
import { TicketService } from './service/ticket.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
