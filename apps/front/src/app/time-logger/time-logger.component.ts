import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LoggerDay {
  month: number;
  year: number;
  date: number;
  value: 0 | 1 | 0.5 /* TODO is this enough ?*/;
}

@Component({
  standalone: true,
  selector: 'time-logger-component',
  imports: [NgForOf, FormsModule],
  templateUrl: 'time-logger-component.component.html',
})
export class TimeLoggerComponent {
  selectedMonth = '';
  monthDays: LoggerDay[] = [];

  onLoad() {
    if (!this.selectedMonth) {
      console.warn('please select a month.');
      return;
    }
    const [year, month] = this.selectedMonth.split('-').map(Number);
    const daysInSelectedMonth = daysInMonth(year, month);
    this.monthDays= Array.from({ length: daysInSelectedMonth }, (_, i): LoggerDay => {
      return {
        month,
        year,
        value: 0,
        date: i + 1,
      };
    });
  }
}
function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}
