import { Injectable } from '@angular/core';

import { User } from './user';
import { USERS } from './mock-users'; //data source here

@Injectable()

export class AppService {
  getUsers(): User[] {
    return USERS;
  }
}
