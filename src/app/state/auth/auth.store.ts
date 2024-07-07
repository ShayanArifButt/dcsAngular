import { Signal, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/user.model';
import { lastValueFrom } from 'rxjs';

export interface AuthState {
    user: User | null;
    error: string | null;
}

const initialState: AuthState = (() => {
    const savedState = localStorage.getItem('authState');
    return savedState ? JSON.parse(savedState) : { user: null, error: null };
})();

export const authStore = signalStore(
    withState(initialState),
    withMethods(({user, error, ...store}) => {
        const authService = inject(AuthService);

        const saveStateToLocalStorage = () => {
            const state = { user: user(), error: error() };
            localStorage.setItem('authState', JSON.stringify(state));
        };

        return {
            async login(username: string, password: string) {
                try {
                    console.log('withMethods login method called');
                    const userObserver = authService.login(username, password);
                    const user = await lastValueFrom(userObserver);
                    console.log("user store")
                    console.log(user)
                    patchState(store, { user, error: null });
                    saveStateToLocalStorage();
                } catch (err) {
                    const error = err as Error;
                    patchState(store, { error: error.message, user: null });
                    saveStateToLocalStorage();
                }
                
            },
            logout() {
                patchState(store, { user: null, error: null });
                saveStateToLocalStorage();
            }
        };
    })
);

