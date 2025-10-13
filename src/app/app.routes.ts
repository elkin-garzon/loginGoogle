import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { Routes } from '@angular/router';
import { environment } from '@environments/environment';
import { Base } from '@layouts/base/base';

export const routes: Routes = [
    {
        path: '',
        component: Base,
        children: [
            {
                path: 'login',
                loadComponent: () => import('@pages/login/login').then(m => m.Login),
                providers: [
                    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
                    provideAuth(() => getAuth()),
                ],
            }
        ]
    }
];
