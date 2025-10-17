import { Component, inject } from '@angular/core';
import { FormAuth } from '@components/form-auth/form-auth';
import { LoginType, SignUpType } from '@typesPortafolio/index';
import { AuthS } from '@services/index';
@Component({
	selector: 'lg-forms',
	imports: [
		FormAuth,
	],
	templateUrl: './forms.html',
})
export class Forms {

	private auth = inject(AuthS);
	public viewForms = 'login';


	public viewForm(action: string) {
		this.viewForms = action;
	}

	public handleDataFormAuth(data: LoginType | SignUpType) {
		if (data.hasOwnProperty('confirmPassword')) {
			this.auth.register(data as SignUpType).then((res) => {
				console.log('User registered:', res);
				this.viewForms = 'login';
			});
		}
	}
}
