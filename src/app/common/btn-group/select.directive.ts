import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appSelect]'
})
export class SelectDirective {

  @Input() propName: string = 'name';

  @Output() appSelect: EventEmitter<string> = new EventEmitter();

  @HostListener('click', ['$event.target'])
  private onElementClick(target: HTMLButtonElement) {
    let nodeName: string = target.nodeName;
    let trials: number = 0;
    while(nodeName !== 'BUTTON' && this.searchDepth > trials) {
      target = target.parentElement as HTMLButtonElement;
      nodeName = target.nodeName;
      trials++;
    }

    this.appSelect.emit(target.name);
  }

  searchDepth: number = 5;

  constructor(
    private ef: ElementRef,
  ) {
    // this.ef.
  }

}
