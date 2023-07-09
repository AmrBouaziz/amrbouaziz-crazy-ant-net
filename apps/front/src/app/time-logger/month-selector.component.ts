import { Component } from '@angular/core';

@Component({
  selector: 'front-time-logger-component',
  template: `
    <label>
      Month :
      <input type="month" [(ngModel)]="selectedMonth" #month />
    </label>

    <button [routerLink]="month.value">Load</button>

    <router-outlet></router-outlet>
  `,
})
export class MonthSelectorComponent {
  selectedMonth = '';
}
