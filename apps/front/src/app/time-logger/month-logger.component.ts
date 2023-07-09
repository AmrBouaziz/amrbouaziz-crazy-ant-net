import { Component } from '@angular/core';
import { LoggerDay } from './time-logger.types';
import { daysInMonth } from './time-logger.utils';

@Component({
  selector: 'front-month-logger',
  template: `
    <label *ngFor="let day of monthDays">
      {{ day.date }} :
      <input [value]="day.value" />
    </label>
  `,
})
export class MonthLoggerComponent {
  monthDays: LoggerDay[] = [];

  onLoad() {
    // if (!this.selectedMonth) {
    //   console.warn('please select a month.');
    //   return;
    // }
    // const [year, month] = this.selectedMonth.split('-').map(Number);
    // const daysInSelectedMonth = daysInMonth(year, month);
    // this.monthDays = Array.from(
    //   { length: daysInSelectedMonth },
    //   (_, i): LoggerDay => {
    //     return {
    //       month,
    //       year,
    //       value: 0,
    //       date: i + 1,
    //     };
    //   },
    // );
  }
}
