import { Component, Input, inject, numberAttribute } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Ticket } from 'src/app/model/ticket';
import { TicketService } from 'src/app/service/ticket.service';
import { Location, NgIf } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-ticket-create',
    templateUrl: './ticket-create.component.html',
    styleUrls: ['./ticket-create.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf, BsDatepickerModule]
})
export class TicketCreateComponent {

  ticketService = inject(TicketService);

  router = inject(Router);

  location: Location = inject(Location);

  ticket = new Ticket();

  form: FormGroup = new FormGroup({
    flightNumber: new FormControl<string>({
      value: '',
      disabled: false,
    }, {
      validators: [
        Validators.required,
        Validators.pattern(/^[A-Za-z]{2}[0-9]{4}$/),
      ],
    }),
    seat: new FormControl<string>({
      value: '',
      disabled: false,
    }, {
      validators: [
        Validators.required,
        Validators.pattern(/^[A-Za-z][0-9]$/),
      ],
      asyncValidators: [
        this.validateSeat(),
      ],
    }),
    service: new FormControl<string>({
      value: '',
      disabled: false,
    }, {
      validators: [
        this.validateAriline(),
      ]
    }),
    checked: new FormControl<boolean>({
      value: false,
      disabled: false,
    }),
    departureDate: new FormControl<Date>({
      value: new Date(),
      disabled: false,
    }),
  });

  datePickerConfig = {
    dateInputFormat: 'YYYY-MM-DD',
  };

  isValid(name: string): boolean {
    return this.form.controls[name]?.pristine
      || this.form.controls[name]?.valid;
  }

  validateAriline(): ValidatorFn {
    return (control: AbstractControl) => {
      if (this.form) {
        const flightNumber = this.form.controls['flightNumber'].value;
        if (flightNumber.slice(0, 2).toLowerCase() !== 'wz') {
          return null;
        }

        const service = this.form.controls['service'].value;
        if (service === 'business') {
          return {airlineError: 'Wizzair do not have business-class!'};
        }
      }
      return null;
    }
  }

  validateSeat(): AsyncValidatorFn {
    return (control: AbstractControl) => this.ticketService.query(
      {
        flightNumer: this.form.controls['flightNumber'].value,
        seat: this.form.controls['seat'].value,
      }
    ).pipe(
      map( (response: Ticket[]) => {
        if (response.length) {
          return {seatError: 'The seat has already been sold!'};
        }
        return null;
      })
    );
  }

  onCreate(): void {
    this.ticketService.create(this.form.value).subscribe(
      () => this.location.back()
    );
  }

}
