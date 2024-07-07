import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChargeDataRecord } from '../../models/charge-data-record.model';
import { ConfigService } from './config.service';
import { MockRecordService } from './mock-record.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private apiUrl = `${environment.apiUrl}/api/chargeDataRecords`;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private mockRecordService: MockRecordService
    ) {}

  getRecords(): Observable<ChargeDataRecord[]> {
    if (this.configService.useMock()) {
        return this.mockRecordService.getRecords();
    }
    return this.http.get<ChargeDataRecord[]>(this.apiUrl);
  }

}
