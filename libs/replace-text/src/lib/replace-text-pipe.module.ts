import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaceTextPipe } from './replace-text.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ReplaceTextPipe],
  exports: [ReplaceTextPipe],
})
export class ReplaceTextPipeModule {}
