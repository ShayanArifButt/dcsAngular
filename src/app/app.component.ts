import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { authStore } from './state/auth/auth.store';
import { RecordListComponent } from "./components/record-list/record-list.component";
import { LoginComponent } from "./components/login/login.component";
import { recordStore } from './state/records/record.store';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [authStore, recordStore],
    imports: [RecordListComponent, LoginComponent, CommonModule, RouterOutlet]
})
export class AppComponent {
  title = 'dcs-frontend';
  authStore = inject(authStore);
  user$ = this.authStore.user();

  logout(): void {
    this.authStore.logout();
  }

}
