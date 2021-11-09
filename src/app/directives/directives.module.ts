import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RollDirective } from './roll.directive';



@NgModule({
  declarations: [
    RollDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RollDirective
  ]
})
export class DirectivesModule { }
