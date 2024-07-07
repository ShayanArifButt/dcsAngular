import { Component, inject } from '@angular/core';
import { authStore } from '../../state/auth/auth.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authStore = inject(authStore);
  username: string = '';
  password: string = '';

  onSubmit(): void {
    this.authStore.login(this.username, this.password);
  }
}
