import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MockAuthService {
  login(username: string, password: string): Observable<User> {
    if (username === 'testUser' && password === 'testPassword') {
      return of({
        username: 'testUser',
        token: 'mock-jwt-token',
      });
    }
    throw new Error('Invalid credentials');
  }
}
