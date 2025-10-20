import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Forms } from '@components/index';

@Component({
	selector: 'lg-login',
	imports: [
		Forms,
	],
	templateUrl: './login.html',
})
export class Login {

	private router = inject(Router);

	public handleSendData(event: any) {
		this.router.navigate(['/profile']);
	}
}
