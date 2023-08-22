# Angular-basic-2023-standalone
Standalone Angular Applications

## Lesson-01
- Explaining the course.
- Setup ngx-bootstrap:
- `ng add ngx-bootstrap`

## Lesson-02
- [Doc](https://valor-software.com/ngx-bootstrap/#/components/dropdowns?tab=overview)
- [ConfigService](src\app\service\config.service.ts)
- [NavComponent](src/app/common/nav/nav.component.ts)
- `import { BsDropdownModule } from 'ngx-bootstrap/dropdown';`
- [NavComponent HTML](src\app\common\nav\nav.component.html)

## Lesson-03
- [Doc](https://valor-software.com/ngx-bootstrap/#/components/alerts?tab=overview)
- [TicketsComponent](src\app\ticket\tickets\tickets.component.ts)
- `import { AlertModule } from 'ngx-bootstrap/alert';`
- [TicketsComponent HTML](src\app\ticket\tickets\tickets.component.ts)

## Lesson-04
- [Doc](https://valor-software.com/ngx-bootstrap/#/components/datepicker?tab=overview)
- [Ticket](src\app\model\ticket.ts)
- [TicketCreateComponent](src\app\ticket\ticket-create\ticket-create.component.ts)
- `import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';`
- [TicketCreateComponent HTML](src\app\ticket\ticket-create\ticket-create.component.html)

## Lesson-05
`ng g c common/toaster --inline-template --standalone --skip-tests --inline-style --flat`
- [Doc](https://getbootstrap.com/docs/5.0/components/toasts/#color-schemes)
- [ToasterComponent](src\app\common\toaster.component.ts)

## Lesson-06
- [AppComponent](src\app\app.component.ts)
- [AppComponent HTML](src\app\app.component.html)
- [TicketsComponent](src\app\ticket\tickets\tickets.component.ts)

## Lesson-07
- [Doc](https://valor-software.com/ngx-bootstrap/#/components/modals?tab=overview#confirm-window)
- [TicketsComponent](src\app\ticket\tickets\tickets.component.ts)
- `import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';`
- `providers: [ BsModalService ],`
- [TicketsComponent HTML](src\app\ticket\tickets\tickets.component.html)

## Lesson-08
- [Doc](https://valor-software.com/ngx-bootstrap/#/components/pagination?tab=overview)
- [TicketsComponent](src\app\ticket\tickets\tickets.component.ts)
- [TicketsComponent HTML](src\app\ticket\tickets\tickets.component.html)

## Lesson-09
Summary
