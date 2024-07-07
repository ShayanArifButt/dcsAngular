import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private useMockData: boolean = true; // Change this flag to switch modes

  useMock(): boolean {
    return this.useMockData;
  }
}
