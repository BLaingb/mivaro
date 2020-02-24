import { NgModule } from '@angular/core';
import { DocPipe } from './doc.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DocPipe
  ],
  exports: [
    DocPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {

}
