import { NgModule } from '@angular/core';
import { MonthSelectorComponent } from './month-selector.component';
import { NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MonthLoggerComponent } from './month-logger.component';
import { ReplaceTextPipeModule } from '@front/replace-text';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NgForOf,
    RouterModule.forChild([
      {
        path: '',
        component: MonthSelectorComponent,
        children: [{ path: ':year/:month', component: MonthLoggerComponent }],
      },
    ]),
    ReplaceTextPipeModule,
    FormsModule,
  ],
  declarations: [MonthSelectorComponent, MonthLoggerComponent],
})
export class TimeLoggerModule {}
