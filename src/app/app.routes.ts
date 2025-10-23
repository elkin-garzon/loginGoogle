import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Routes } from '@angular/router';
import { environment } from '@environments/environment';
import { authGuard } from '@guards/auth-guard';
import { Base } from '@layouts/base/base';
import { AuthS } from '@services/auth/auth';

export const routes: Routes = [
    {
        path: '',
        component: Base,
        providers: [
            AuthS,

            provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
            provideAuth(() => getAuth()),
            provideFirestore(() => getFirestore()),
            { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
        ],
        children: [
            {
                path: 'login',
                loadComponent: () => import('@pages/login/login').then(m => m.Login),

            },
            {
                path: 'profile',
                canActivate: [authGuard],
                loadComponent: () => import('@pages/profile/profile').then(m => m.Profile),
                providers: [],
            }
        ]
    }
];
