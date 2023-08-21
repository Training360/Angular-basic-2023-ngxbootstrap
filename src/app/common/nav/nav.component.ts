import { Component, inject } from '@angular/core';
import { ConfigService, INavItem } from 'src/app/service/config.service';
import { NgFor, JsonPipe, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    standalone: true,
    imports: [
      RouterLink,
      NgFor,
      RouterLinkActive,
      BsDropdownModule,
      JsonPipe,
      NgIf,
      NgSwitch,
      NgSwitchCase,
      NgSwitchDefault,
      NgTemplateOutlet,
    ]
})
export class NavComponent {

  config = inject(ConfigService);

  items = this.config.navigationItems;

  checkDropdown(item: INavItem): boolean {
    return Boolean(item.dropdown);
  }

}
