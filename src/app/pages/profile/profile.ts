import { Component, inject } from '@angular/core';
import { AuthS } from '@services/index';

@Component({
	selector: 'lg-profile',
	imports: [],
	templateUrl: './profile.html'
})
export class Profile {
	private auth = inject(AuthS);

	ngOnInit() {
		this.auth.getUserbyId('2IQMjudGRRV27dWxDZSP0e9tYF33').then(user => {
			console.log(user);
		});
	}
}
