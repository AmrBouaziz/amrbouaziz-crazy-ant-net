import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'crazy-ant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front';
}

