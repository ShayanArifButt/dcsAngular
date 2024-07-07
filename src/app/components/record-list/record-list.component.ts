import { Component, OnInit, inject } from '@angular/core';
import { recordStore } from '../../state/records/record.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ChargeDataRecord } from '../../models/charge-data-record.model';

@Component({
  selector: 'app-record-list',
  standalone: true,
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, NgbPaginationModule],
})
export class RecordListComponent implements OnInit {
  recordStore = inject(recordStore);
  records$ = this.recordStore.records;
  error$ = this.recordStore.error;
  fullRecords: ChargeDataRecord[] = [];
  paginatedRecords: ChargeDataRecord[] = [];
  filterId: string = '';
  sortColumn: keyof ChargeDataRecord | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  pageSize = 10;
  totalRecords: number = 0;

  ngOnInit(): void {
    this.recordStore.loadRecords().then(() => {
      this.fullRecords = this.recordStore.records();
      this.totalRecords = this.fullRecords.length;
      this.applyFiltersAndSorting();
    });
  }

  sort(column: keyof ChargeDataRecord): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSorting();
  }

  filterRecords(): void {
    this.applyFiltersAndSorting();
  }

  loadPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  private applyFiltersAndSorting(): void {
    let records = [...this.fullRecords]; // Use full dataset for filtering and sorting

    // Apply filtering
    if (this.filterId) {
      records = records.filter(record => record.chargingSessionId.includes(this.filterId));
    }

    // Apply sorting
    if (this.sortColumn) {
      records.sort((a, b) => {
        if (this.sortColumn !== "") {
          let valueA = a[this.sortColumn];
          let valueB = b[this.sortColumn];

          if (this.sortColumn === 'startTime' || this.sortColumn === 'endTime') {
            valueA = new Date(valueA).getTime();
            valueB = new Date(valueB).getTime();
          }

          if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
          if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }

    this.totalRecords = records.length;
    this.fullRecords = records;
    this.updatePagination();
  }

  private updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRecords = this.fullRecords?.slice(startIndex, endIndex) || [];
  }
}
