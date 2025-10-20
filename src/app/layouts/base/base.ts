import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkMode } from '@components/index';
import { AuthS } from '@services/auth/auth';

@Component({
	selector: 'lg-base',
	imports: [
		RouterOutlet,
		DarkMode
	],
	templateUrl: './base.html'
})
export class Base {


	private auth = inject(AuthS);
}
