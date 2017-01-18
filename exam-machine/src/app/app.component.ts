import { Component } from '@angular/core';

import { User } from './user';
import { AppService } from './app.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    AppService
  ]
})
export class AppComponent {
  users: User[];

  constructor(private appService: AppService) { }
}
