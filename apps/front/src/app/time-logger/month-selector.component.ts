import { Component } from '@angular/core';

@Component({
  selector: 'front-time-logger-component',
  template: `
    <label>
      Month :
      <input type="month" [(ngModel)]="selectedMonth" #month />
    </label>

    <button
      [routerLink]="selectedMonth | replaceText : '-' : '/'"
      [disabled]="selectedMonth === ''"
    >
      Load
    </button>

    <router-outlet></router-outlet>
  `,
})
export class MonthSelectorComponent {
  selectedMonth = '';
}
