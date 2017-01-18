import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      {id: 1, username: 'admin', password: 'admin', hint: 'admin', permission: 1},
      {id: 2, username: 'user', password: 'user', hint: 'user', permission: 0}
    ]
;
    return { users };
  }
}
