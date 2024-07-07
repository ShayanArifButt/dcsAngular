import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecordListComponent } from './components/record-list/record-list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'records', component: RecordListComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
  ];
