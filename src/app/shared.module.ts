import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnGroupComponent } from './common/btn-group/btn-group.component';
import { ArrayFilterPipe } from './pipe/array-filter.pipe';
import { BooleanPipe } from './pipe/boolean.pipe';
import { SelectDirective } from './common/btn-group/select.directive';



@NgModule({
  declarations: [
    BtnGroupComponent,
    ArrayFilterPipe,
    BooleanPipe,
    SelectDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BtnGroupComponent,
    ArrayFilterPipe,
    BooleanPipe,
    SelectDirective,
  ],
})
export class SharedModule { }
