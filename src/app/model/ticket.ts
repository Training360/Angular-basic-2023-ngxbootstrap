export class Ticket {
  id?: number = 0;
  flightNumber: string = '';
  seat: string = '';
  service: 'tourist' | 'business' | 'economy' = 'economy';
  checked: boolean = false;
}
