import { Component } from '@angular/core';
// import { trigger, transition, style, animate } from '@angular/animations';

import { FormsLogin } from '../forms-login/forms-login';
import { FormsSingUp } from '@components/forms-sing-up/forms-sing-up';

@Component({
	selector: 'lg-forms',
	imports: [
		FormsLogin,
		FormsSingUp
	],
	templateUrl: './forms.html',
})
export class Forms {

	public viewForms = 'login';


	public viewForm(action: string) {
		this.viewForms = action;
	}
}
