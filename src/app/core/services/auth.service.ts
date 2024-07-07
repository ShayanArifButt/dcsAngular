import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../../models/user.model';
import { ConfigService } from './config.service';
import { MockAuthService } from './mock-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private mockAuthService: MockAuthService
) {}

  login(username: string, password: string): Observable<User> {
    if (this.configService.useMock()) {
        return this.mockAuthService.login(username, password);
    }
    return this.http.post<User>(`${this.apiUrl}/login`, { username, password });
  }
}
