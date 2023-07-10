import { Component, OnInit } from '@angular/core';
import { LoggerDay } from './time-logger.types';
import { daysInMonth } from './time-logger.utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'front-month-logger',
  template: `
    <div class="flex flex-col">
      <label *ngFor="let day of monthDays">
        {{ day.date }} :
        <input [value]="day.value" />
      </label>
    </div>
  `,
})
export class MonthLoggerComponent implements OnInit {
  monthDays: LoggerDay[] = [];

  constructor(private readonly route: ActivatedRoute) {}

  populateMonthDays(year: number, month: number) {
    const daysInSelectedMonth = daysInMonth(year, month);
    this.monthDays = Array.from(
      { length: daysInSelectedMonth },
      (_, i): LoggerDay => {
        return {
          month,
          year,
          value: 0,
          date: i + 1,
        };
      },
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.populateMonthDays(
        Number(params.get('year')),
        Number(params.get('month')),
      );
    });
  }
}
