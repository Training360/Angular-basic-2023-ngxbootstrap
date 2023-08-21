import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AboutComponent } from './page/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'ticket',
    loadChildren: () => import('./ticket/routes').then(
      mod => mod.TICKET_ROUTES
    ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
