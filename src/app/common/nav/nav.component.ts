import { Component, inject } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    standalone: true,
    imports: [RouterLink, NgFor, RouterLinkActive]
})
export class NavComponent {

  config = inject(ConfigService);

  items = this.config.navigationItems;

}
