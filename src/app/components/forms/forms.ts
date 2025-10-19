import { Component, inject, output } from '@angular/core';
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
	public sendData = output<LoginType | SignUpType>();

	public viewForm(action: string) {
		this.viewForms = action;
	}

	public async handleDataFormAuth(data: LoginType | SignUpType) {
		if (data.hasOwnProperty('confirmPassword')) {
			this.auth.register(data as SignUpType).then((res) => {
				console.log('User registered:', res);
				this.viewForms = 'login';
			});
			return;
		}
		let response = await this.auth.signIn(data as LoginType) as any;
		this.sendData.emit(response);
	}
}
