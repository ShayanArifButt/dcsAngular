import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { RecordService } from '../../core/services/record.service';
import { ChargeDataRecord } from '../../models/charge-data-record.model';
import { lastValueFrom } from 'rxjs';

export interface RecordState {
  records: ChargeDataRecord[];
  error: string | null;
}

const initialState: RecordState = {
  records: [],
  error: null,
};

export const recordStore = signalStore(
    withState(initialState),
    withMethods(({records, error, ...store}) => {
      const recordService = inject(RecordService);
      return {
        async loadRecords() {
          try {
            const recordsObserver = await recordService.getRecords();
            const records = await lastValueFrom(recordsObserver);
            patchState(store, { records, error: null });
          } catch (err) {
            const error = err as Error;
            patchState(store, { records: [], error: error.message });
          }
        },
        patchRecords(records: ChargeDataRecord[]) {
            patchState(store, { records: records });
        }
      };
    })
  );
