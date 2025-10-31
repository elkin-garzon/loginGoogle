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

	ngOnInit(): void {
		const theme = localStorage.getItem('theme');
		const browserDark = window.matchMedia('(prefers-color-scheme: dark)').matches; if (theme !== null) {
			if (theme === 'dark') {
				document.documentElement.classList.add('dark');
			}
		} else if (browserDark) {
			document.documentElement.classList.add('dark');
		}
	}
}
