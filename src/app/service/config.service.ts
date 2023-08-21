import { Injectable } from '@angular/core';

export interface INavItem {
  text: string;
  link: string;
  dropdown?: INavItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  navigationItems: INavItem[] = [
    {text: 'Home', link: '/'},
    {text: 'Tickets', link: '/ticket', dropdown: [
      {text: 'List', link: '/ticket'},
      {text: 'Create', link: '/ticket/create'},
    ]},
    {text: 'About', link: '/about'},
  ];

  constructor() { }
}
