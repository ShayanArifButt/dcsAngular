import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChargeDataRecord } from '../../models/charge-data-record.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MockRecordService {
    constructor(private http: HttpClient) {}

    getRecords(): Observable<ChargeDataRecord[]> {
      return this.http.get<ChargeDataRecord[]>('../../../assets/mock-records.json');
    }
}
