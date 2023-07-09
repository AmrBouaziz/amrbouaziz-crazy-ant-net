import { NgModule } from '@angular/core';
import { MonthSelectorComponent } from './month-selector.component';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MonthLoggerComponent } from './month-logger.component';

@NgModule({
  imports: [
    NgForOf,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: MonthSelectorComponent,
        children: [{ path: ':year/:month', component: MonthLoggerComponent }],
      },
    ]),
  ],
  declarations: [MonthSelectorComponent, MonthLoggerComponent],
})
export class TimeLoggerModule {}
