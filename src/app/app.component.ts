import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './common/nav/nav.component';
import { ToastComponent } from './common/toast.component';
import { ToasterComponent } from './common/toaster.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NavComponent, RouterOutlet, ToastComponent, ToasterComponent]
})
export class AppComponent {

}
