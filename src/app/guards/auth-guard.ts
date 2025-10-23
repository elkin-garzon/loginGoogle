import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthS } from '@services/index';
import { map, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthS)
	const router = inject(Router)

	return authService.userActivate$.pipe(
		take(1),
		map(response => {
			return response ? true : false;
		}),
		tap(permiso => {
			if (!permiso) {
				router.navigateByUrl('login');
			}
		})
	)
};

