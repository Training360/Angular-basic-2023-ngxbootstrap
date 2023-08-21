import { Component, OnInit, inject } from '@angular/core';
import { Ticket } from './model/ticket';
import { IBtn, IBtnGroupOutput } from './common/btn-group/btn-group.component';
import { BaseService } from './service/base.service';
import { TicketService } from './service/ticket.service';
import { BehaviorSubject } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './common/nav/nav.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NavComponent, RouterOutlet]
})
export class AppComponent {

}
