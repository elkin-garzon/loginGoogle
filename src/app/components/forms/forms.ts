import { Component } from '@angular/core';
import { FormAuth } from '@components/form-auth/form-auth';
import { LoginType, SignUpType } from '@typesPortafolio/index';

@Component({
	selector: 'lg-forms',
	imports: [
		FormAuth
	],
	templateUrl: './forms.html',
})
export class Forms {

	public viewForms = 'login';


	public viewForm(action: string) {
		this.viewForms = action;
	}

	public handleDataFormAuth(data: LoginType | SignUpType) {
		console.log(data);
	}
}
